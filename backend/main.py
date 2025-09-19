from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Import configuration
from config.settings import get_settings
from config.cors import get_cors_origins

# Import core components
from core.logging import setup_logging
from core.lifespan import lifespan

# Import routers
from auth.routes import router as auth_router
from users.routes import router as users_router
from api.health import router as health_router
from api.config import router as config_router
from api.version import router as version_router
from career.routes import router as career_router
from database.routes.profile_routes import router as profile_router 
# Import chat routes (with fallback)
try:
    from chat.routes import router as chat_router
    CHAT_ENABLED = True
except ImportError as e:
    logging.warning(f"⚠️ Chat routes not loaded: {e}")
    CHAT_ENABLED = False

# Initialize settings
settings = get_settings()

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Student Advisor Portal",
    description="Community chat platform with Firestore backend",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(users_router, prefix="/api/user", tags=["users"])
app.include_router(health_router, tags=["health"])
app.include_router(config_router, prefix="/api", tags=["configuration"])
app.include_router(version_router, prefix="/api", tags=["version"])
app.include_router(career_router, tags=["career"])
app.include_router(profile_router, tags=["profile"])

# Include chat router if available
if CHAT_ENABLED:
    app.include_router(chat_router, tags=["chat"])
    logger.info("✅ Chat routes loaded")

# Root endpoint
@app.get("/")
def root():
    """API root endpoint"""
    return {
        "message": "Student Advisor Portal API",
        "version": "1.0.0",
        "database": "Firestore",
        "status": "running",
        "websocket_url": "/api/chat/ws/{user_id}" if CHAT_ENABLED else None,
        "docs": "/docs",
        "features": {
            "chat": CHAT_ENABLED,
            "authentication": True,
            "user_management": True,
            "career_guidance": True,
            "profile_management": True
        }
    }

# Run configuration
if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"🚀 Starting server on {settings.HOST}:{settings.PORT}")
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )