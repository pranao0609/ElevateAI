from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional, List
import jwt
import logging
import os
import sys
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth, firestore
from career_routes import router as career_router

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Add project path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# ---- Initialize Firebase Admin (Original Method) ----
try:
    # Try to initialize Firebase if not already initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        logger.info("✅ Firebase initialized with original method")
    else:
        db = firestore.client()
        logger.info("✅ Using existing Firebase connection")
except Exception as e:
    logger.error(f"❌ Firebase initialization failed: {e}")

# Import database (Enhanced Method)
from database.firestore import firestore_db

# Application lifecycle
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting Student Advisor Portal...")
    
    try:
        # Connect to Firestore (Enhanced Method)
        enhanced_db = firestore_db.connect()
        
        # Initialize collections
        await firestore_db.create_collections_and_indexes()
        
        # Create default data
        await firestore_db.create_default_data()
        
        logger.info("✅ Application startup complete")
        
    except Exception as e:
        logger.error(f"❌ Startup failed: {e}")
        # Fallback to original Firebase connection
        logger.info("🔄 Using fallback Firebase connection")
    
    yield
    
    # Shutdown
    logger.info("🔄 Shutting down...")
    try:
        firestore_db.disconnect()
    except:
        pass
    logger.info("✅ Shutdown complete")

# Create FastAPI app
app = FastAPI(
    title="Student Advisor Portal",
    description="Community chat platform with Firestore backend",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:8080",  # React frontend port
    "http://127.0.0.1:8080",
    "http://localhost:3000",  # Alternative React port
    "*"  # Allow all origins for development
]

app.include_router(career_router)
# Enhanced CORS from environment
try:
    env_origins = os.getenv("CORS_ORIGINS", "").split(",")
    if env_origins and env_origins[0]:  # If environment origins exist
        origins.extend(env_origins)
except:
    pass

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- JWT Config ----
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "YOUR_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---- Models ----
class UserSignup(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    status: Optional[str] = None

# Database dependency functions
def get_database():
    """Get Firestore database instance (Enhanced Method)"""
    try:
        return firestore_db.get_db()
    except:
        # Fallback to original Firebase connection
        return db

def get_original_database():
    """Get original Firestore database instance"""
    return db

# ---- Firebase ID Token verification ----
def verify_token(authorization: Optional[str] = Header(None)):
    """Verify Firebase ID token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

# ---- Helper: JWT generation ----
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Enhanced JWT token verification
def get_current_user_from_token(authorization: Optional[str] = Header(None)):
    """Get current user from JWT token"""
    if not authorization:
        return None
    
    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        
        if email:
            # Try enhanced database first, then fallback to original
            try:
                database = get_database()
            except:
                database = get_original_database()
            
            # Find user by email
            users = database.collection("users").where("email", "==", email).get()
            if users:
                user_data = users[0].to_dict()
                user_data["_id"] = users[0].id
                return user_data
    except Exception as e:
        logger.error(f"Token validation error: {e}")
    
    return None

def require_authentication(authorization: Optional[str] = Header(None)):
    """Require valid authentication"""
    user = get_current_user_from_token(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user

# Import chat components
try:
    from chat.routes import router as chat_router
    from chat.manager import manager
    
    # Include routers
    app.include_router(chat_router, prefix="/api", tags=["chat"])
    logger.info("✅ Chat routes loaded")
except Exception as e:
    logger.warning(f"⚠️ Chat routes not loaded: {e}")
    # Create dummy manager for compatibility
    class DummyManager:
        def get_online_users(self):
            return []
    manager = DummyManager()

# ---- Root ----
@app.get("/")
def root():
    return {
        "message": "Student Advisor Portal API",
        "version": "1.0.0",
        "database": "Firestore",
        "status": "running",
        "websocket_url": "/api/chat/ws/{user_id}",
        "docs": "/docs"
    }

# ---- Manual Signup (Enhanced Version) ----
@app.post("/auth/signup")
def signup(user: UserSignup):
    """User registration with enhanced features"""
    try:
        # Try enhanced database first
        try:
            database = get_database()
        except:
            database = get_original_database()
        
        # Check if user exists
        existing_users = database.collection("users").where("email", "==", user.email).get()
        if existing_users:
            raise HTTPException(status_code=400, detail="User already exists")

        # Hash password
        hashed_password = pwd_context.hash(user.password)
        
        # Create enhanced user document
        user_doc = {
            "user_id": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "password": hashed_password,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_activity": datetime.utcnow(),
            "is_active": True,
            "avatar_url": None,
            "bio": "",
            "status": "online",
            "chat_settings": {
                "notifications_enabled": True,
                "sound_enabled": True,
                "online_status_visible": True
            },
            "preferences": {
                "theme": "light",
                "language": "en"
            }
        }
        
        # Save to database
        doc_ref = database.collection("users").document()
        doc_ref.set(user_doc)
        
        # Create JWT token
        token = create_access_token({"email": user.email, "user_id": user.email})
        
        # Return user data (without password)
        user_doc.pop("password")
        user_doc["_id"] = doc_ref.id
        
        return {
            "message": "Registration successful",
            "token": token,
            "user": user_doc
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail="Registration failed")

# ---- Manual Login (Enhanced Version) ----
@app.post("/auth/signin")   # match frontend
def signin(user: UserLogin):
    """User authentication with enhanced features"""
    try:
        # Try enhanced database first
        try:
            database = get_database()
        except:
            database = get_original_database()
        
        # Find user
        users_query = database.collection("users").where("email", "==", user.email).get()
        
        if not users_query:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        user_doc = users_query[0]
        user_data = user_doc.to_dict()
        
        # Verify password
        if not pwd_context.verify(user.password, user_data["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Update last activity (enhanced version)
        try:
            user_doc.reference.update({
                "last_activity": datetime.utcnow(),
                "status": "online",
                "updated_at": datetime.utcnow()
            })
        except:
            # Fallback for simpler update
            pass

        # Create JWT token
        token = create_access_token({"email": user.email, "user_id": user.email})
        
        # Return enhanced user data (without password)
        user_data.pop("password", None)
        user_data["_id"] = user_doc.id
        
        return {
            "message": "Login successful",
            "token": token,
            "user": user_data
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Login failed")

# ---- Google SignIn ----
@app.post("/auth/google")
def google_auth(user_data: dict, decoded_token=Depends(verify_token)):
    """Google authentication"""
    try:
        uid = decoded_token["uid"]
        email = decoded_token.get("email")
        name = user_data.get("name", "Unknown User")

        # Try enhanced database first
        try:
            database = get_database()
        except:
            database = get_original_database()

        # Enhanced user document for Google users
        user_ref = database.collection("users").document(uid)
        user_doc = {
            "user_id": email,
            "email": email,
            "firstName": name.split(" ")[0] if name else "Google",
            "lastName": " ".join(name.split(" ")[1:]) if len(name.split(" ")) > 1 else "User",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_activity": datetime.utcnow(),
            "is_active": True,
            "status": "online",
            "auth_provider": "google",
            "chat_settings": {
                "notifications_enabled": True,
                "sound_enabled": True,
                "online_status_visible": True
            },
            "preferences": {
                "theme": "light",
                "language": "en"
            }
        }
        
        user_ref.set(user_doc, merge=True)

        # Create JWT token for consistency
        token = create_access_token({"email": email, "user_id": email})

        return {
            "message": "Google login successful!",
            "token": token,
            "uid": uid,
            "name": name,
            "email": email,
            "user": user_doc
        }
    except Exception as e:
        logger.error(f"Google auth error: {e}")
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")

# ---- Protected route examples ----
@app.get("/profile")
def get_profile_simple(authorization: Optional[str] = Header(None)):
    """Get user profile (simple version)"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        
        # Try enhanced database first
        try:
            database = get_database()
        except:
            database = get_original_database()
        
        user_query = database.collection("users").where("email", "==", email).get()
        if not user_query:
            raise HTTPException(status_code=404, detail="User not found")
        
        profile_data = user_query[0].to_dict()
        profile_data.pop("password", None)  # Remove password
        
        return {"profile": profile_data}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception as e:
        logger.error(f"Profile fetch error: {e}")
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

# User Profile Endpoints (Enhanced)
@app.get("/api/user/profile")
def get_profile_enhanced(current_user: dict = Depends(require_authentication)):
    """Get current user profile (enhanced version)"""
    profile = current_user.copy()
    profile.pop("password", None)
    
    return {
        "user_id": profile.get("user_id", profile.get("email")),
        "firstName": profile.get("firstName", ""),
        "lastName": profile.get("lastName", ""),
        "email": profile["email"],
        "avatar_url": profile.get("avatar_url"),
        "bio": profile.get("bio", ""),
        "status": profile.get("status", "online"),
        "chat_settings": profile.get("chat_settings", {}),
        "preferences": profile.get("preferences", {})
    }

@app.put("/api/user/profile")
def update_profile(
    profile_data: UserProfile,
    current_user: dict = Depends(require_authentication)
):
    """Update user profile"""
    try:
        # Try enhanced database first
        try:
            database = get_database()
        except:
            database = get_original_database()
        
        user_ref = database.collection("users").document(current_user["_id"])
        
        update_data = {"updated_at": datetime.utcnow()}
        
        # Update only provided fields
        for field, value in profile_data.dict(exclude_unset=True).items():
            update_data[field] = value
            
        user_ref.update(update_data)
        
        return {"message": "Profile updated successfully"}
        
    except Exception as e:
        logger.error(f"Profile update error: {e}")
        raise HTTPException(status_code=500, detail="Failed to update profile")

@app.get("/api/user/chat-info")
def get_chat_info(current_user: dict = Depends(require_authentication)):
    """Get user information for chat"""
    return {
        "user_id": current_user.get("user_id", current_user["email"]),
        "username": f"{current_user.get('firstName', '')} {current_user.get('lastName', '')}".strip(),
        "email": current_user["email"],
        "avatar_url": current_user.get("avatar_url"),
        "status": current_user.get("status", "online"),
        "chat_settings": current_user.get("chat_settings", {}),
        "is_online": True
    }

# Health and Statistics Endpoints
@app.get("/health")
def health_check():
    """Health check endpoint"""
    try:
        # Try enhanced health check first
        try:
            db_healthy = firestore_db.health_check()
            db_stats = firestore_db.get_stats()
        except:
            # Fallback health check
            db_healthy = True
            db_stats = {"status": "connected", "method": "original"}
        
        return {
            "status": "healthy" if db_healthy else "unhealthy",
            "timestamp": datetime.utcnow().isoformat(),
            "database": db_stats,
            "websocket_connections": len(manager.get_online_users()),
            "service": "student-advisor-portal"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "timestamp": datetime.utcnow().isoformat(),
            "error": str(e)
        }

@app.get("/api/stats")
def get_platform_stats(current_user: dict = Depends(require_authentication)):
    """Get platform statistics"""
    try:
        # Try enhanced database first
        try:
            database = get_database()
        except:
            database = get_original_database()
        
        # Get counts
        users = database.collection("users").get()
        user_count = len([u for u in users if u.to_dict().get("is_active", True)])
        
        try:
            rooms = database.collection("chat_rooms").where("is_active", "==", True).get()
            room_count = len(rooms)
        except:
            room_count = 0
        
        # Get messages from last 24 hours
        yesterday = datetime.utcnow() - timedelta(days=1)
        try:
            recent_messages = database.collection("messages").where("timestamp", ">=", yesterday).get()
            message_count = len(recent_messages)
        except:
            message_count = 0
        
        return {
            "total_users": user_count,
            "total_rooms": room_count,
            "messages_today": message_count,
            "online_users": len(manager.get_online_users()),
            "active_rooms": len([r for r in getattr(manager, 'room_members', {}).items() if r[1]])
        }
        
    except Exception as e:
        logger.error(f"Stats error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get statistics")

# Additional utility endpoints
@app.get("/api/version")
def get_version():
    """Get API version information"""
    return {
        "version": "1.0.0",
        "name": "Student Advisor Portal",
        "description": "Community chat platform with Firestore backend",
        "firebase_initialized": bool(firebase_admin._apps),
        "enhanced_db_available": True,
        "chat_enabled": 'chat_router' in locals(),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/api/config")
def get_config():
    """Get client configuration"""
    return {
        "websocket_url": f"ws://localhost:{os.getenv('PORT', 8000)}/api/chat/ws",
        "api_base_url": f"http://localhost:{os.getenv('PORT', 8000)}",
        "features": {
            "chat": True,
            "google_auth": True,
            "manual_auth": True,
            "file_upload": False,
            "notifications": True
        },
        "limits": {
            "message_length": 2000,
            "room_members": 100,
            "file_size_mb": 10
        }
    }

# Run configuration
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"🚀 Starting server on {host}:{port}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
