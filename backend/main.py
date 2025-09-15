from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, auth, firestore
from typing import Optional
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

# ---- Initialize Firebase Admin ----
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ---- FastAPI setup ----
app = FastAPI()

origins = [
    "http://localhost:8080",  # React frontend port
    "http://127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- JWT Config ----
SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

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

# ---- Firebase ID Token verification ----
def verify_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---- Helper: JWT generation ----
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ---- Root ----
@app.get("/")
def root():
    return {"message": "Backend is running!"}

# ---- Manual Signup ----
@app.post("/auth/signup")
def manual_signup(user: UserSignup):
    try:
        # Check if user exists
        users_ref = db.collection("users")
        query = users_ref.where("email", "==", user.email).get()
        if query:
            raise HTTPException(status_code=400, detail="User already exists")

        hashed_password = pwd_context.hash(user.password)
        user_doc = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "password": hashed_password
        }
        db.collection("users").document().set(user_doc)

        token = create_access_token({"email": user.email})
        return {"message": "Signup successful!", "token": token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")

# ---- Manual Login ----
@app.post("/auth/signin")   # match frontend
def manual_login(user: UserLogin):
    try:
        users_ref = db.collection("users")
        query = users_ref.where("email", "==", user.email).stream()
        
        user_doc = None
        for doc in query:   # safely iterate
            user_doc = doc.to_dict()
            break

        if not user_doc:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not pwd_context.verify(user.password, user_doc["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({"email": user.email})
        return {"message": "Login successful!", "token": token}

    except HTTPException:
        raise
    except Exception as e:
        print("Login error:", e)   # debug log
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")
# ---- Google SignIn ----
@app.post("/auth/google")
def google_auth(user_data: dict, decoded_token=Depends(verify_token)):
    try:
        uid = decoded_token["uid"]
        email = decoded_token.get("email")
        name = user_data.get("name", "Unknown User")

        user_ref = db.collection("users").document(uid)
        user_ref.set({
            "email": email,
            "name": name
        }, merge=True)

        return {
            "message": "Google login successful!",
            "uid": uid,
            "name": name,
            "email": email
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")

# ---- Protected route example ----
@app.get("/profile")
def get_profile(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        user_query = db.collection("users").where("email", "==", email).get()
        if not user_query:
            raise HTTPException(status_code=404, detail="User not found")
        return {"profile": user_query[0].to_dict()}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
