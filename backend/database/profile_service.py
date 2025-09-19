import logging
from datetime import datetime
from typing import Optional, Dict, Any
from google.cloud.firestore import DocumentSnapshot
from google.cloud import firestore

from .firestore import firestore_db
from models.profile import UserProfile, ProfileResponse

logger = logging.getLogger(__name__)

class ProfileService:
    def __init__(self):
        self.collection_name = "user_profiles"
    
    def _get_db(self):
        """Get Firestore database instance"""
        return firestore_db.get_db()
    
    def _serialize_profile(self, profile: UserProfile) -> Dict[str, Any]:
        """Convert Pydantic model to dict for Firestore storage"""
        return profile.model_dump(by_alias=True)
    
    def _deserialize_profile(self, data: Dict[str, Any]) -> UserProfile:
        """Convert Firestore data to Pydantic model"""
        return UserProfile.model_validate(data)
    
    async def create_profile(self, user_id: str, profile: UserProfile) -> ProfileResponse:
        """Create a new user profile"""
        try:
            db = self._get_db()
            doc_ref = db.collection(self.collection_name).document(user_id)
            
            # Check if profile already exists
            existing_doc = doc_ref.get()
            if existing_doc.exists:
                raise ValueError(f"Profile already exists for user {user_id}")
            
            # Prepare data for storage
            now = datetime.utcnow()
            profile_data = {
                "user_id": user_id,
                "profile": self._serialize_profile(profile),
                "created_at": now,
                "updated_at": now
            }
            
            # Save to Firestore
            doc_ref.set(profile_data)
            
            logger.info(f"✅ Profile created for user {user_id}")
            
            return ProfileResponse(
                user_id=user_id,
                profile=profile,
                created_at=now,
                updated_at=now
            )
            
        except Exception as e:
            logger.error(f"❌ Failed to create profile for user {user_id}: {str(e)}")
            raise Exception(f"Failed to create profile: {str(e)}")
    
    async def get_profile(self, user_id: str) -> Optional[ProfileResponse]:
        """Get user profile by user ID"""
        try:
            db = self._get_db()
            doc_ref = db.collection(self.collection_name).document(user_id)
            doc = doc_ref.get()
            
            if not doc.exists:
                logger.warning(f"⚠️ Profile not found for user {user_id}")
                return None
            
            data = doc.to_dict()
            
            # Convert timestamps if they exist
            created_at = data.get("created_at")
            updated_at = data.get("updated_at")
            
            if isinstance(created_at, firestore.SERVER_TIMESTAMP):
                created_at = datetime.utcnow()
            if isinstance(updated_at, firestore.SERVER_TIMESTAMP):
                updated_at = datetime.utcnow()
            
            profile = self._deserialize_profile(data["profile"])
            
            logger.info(f"✅ Profile retrieved for user {user_id}")
            
            return ProfileResponse(
                user_id=user_id,
                profile=profile,
                created_at=created_at,
                updated_at=updated_at
            )
            
        except Exception as e:
            logger.error(f"❌ Failed to get profile for user {user_id}: {str(e)}")
            raise Exception(f"Failed to retrieve profile: {str(e)}")
    
    async def update_profile(self, user_id: str, profile: UserProfile) -> ProfileResponse:
        """Update user profile"""
        try:
            db = self._get_db()
            doc_ref = db.collection(self.collection_name).document(user_id)
            
            # Get existing document to preserve created_at
            existing_doc = doc_ref.get()
            created_at = datetime.utcnow()  # Default fallback
            
            if existing_doc.exists:
                existing_data = existing_doc.to_dict()
                created_at = existing_data.get("created_at", datetime.utcnow())
            
            # Prepare updated data
            now = datetime.utcnow()
            profile_data = {
                "user_id": user_id,
                "profile": self._serialize_profile(profile),
                "created_at": created_at,
                "updated_at": now
            }
            
            # Update in Firestore (this will create if doesn't exist)
            doc_ref.set(profile_data)
            
            logger.info(f"✅ Profile updated for user {user_id}")
            
            return ProfileResponse(
                user_id=user_id,
                profile=profile,
                created_at=created_at,
                updated_at=now
            )
            
        except Exception as e:
            logger.error(f"❌ Failed to update profile for user {user_id}: {str(e)}")
            raise Exception(f"Failed to update profile: {str(e)}")
    
    async def delete_profile(self, user_id: str) -> bool:
        """Delete user profile"""
        try:
            db = self._get_db()
            doc_ref = db.collection(self.collection_name).document(user_id)
            
            # Check if document exists
            doc = doc_ref.get()
            if not doc.exists:
                logger.warning(f"⚠️ Profile not found for deletion: {user_id}")
                return False
            
            # Delete the document
            doc_ref.delete()
            
            logger.info(f"✅ Profile deleted for user {user_id}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to delete profile for user {user_id}: {str(e)}")
            raise Exception(f"Failed to delete profile: {str(e)}")
    
    async def profile_exists(self, user_id: str) -> bool:
        """Check if user profile exists"""
        try:
            db = self._get_db()
            doc_ref = db.collection(self.collection_name).document(user_id)
            doc = doc_ref.get()
            
            return doc.exists
            
        except Exception as e:
            logger.error(f"❌ Failed to check profile existence for user {user_id}: {str(e)}")
            return False

# Global profile service instance
profile_service = ProfileService()