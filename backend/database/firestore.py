import firebase_admin
from firebase_admin import credentials, firestore
import os
import logging
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta
import asyncio
from concurrent.futures import ThreadPoolExecutor
import functools

logger = logging.getLogger(__name__)

class FirestoreConnection:
    def __init__(self):
        self.db: Optional[firestore.Client] = None
        self.app: Optional[firebase_admin.App] = None
        self._connected = False
        self.executor = ThreadPoolExecutor(max_workers=10)
        
        # Configuration
        self.project_id = os.getenv("FIREBASE_PROJECT_ID", "ai-advisor-86f45")
        self.credentials_path = os.getenv("FIREBASE_CREDENTIALS", "serviceAccountKey.json")
    
    def connect(self) -> firestore.Client:
        """Connect to Firestore database"""
        if self._connected and self.db:
            return self.db
        
        try:
            # Check if Firebase is already initialized
            if not firebase_admin._apps:
                # Ensure credentials file exists
                if not os.path.exists(self.credentials_path):
                    raise FileNotFoundError(f"Firebase credentials not found at: {self.credentials_path}")
                
                # Initialize Firebase Admin SDK
                cred = credentials.Certificate(self.credentials_path)
                self.app = firebase_admin.initialize_app(cred, {
                    'projectId': self.project_id
                })
                logger.info("🔥 Firebase Admin SDK initialized")
            else:
                self.app = firebase_admin.get_app()
            
            # Get Firestore client
            self.db = firestore.client()
            self._connected = True
            
            # Test connection
            self._test_connection()
            
            logger.info("✅ Firestore connected successfully")
            return self.db
            
        except Exception as e:
            logger.error(f"❌ Firestore connection failed: {e}")
            raise Exception(f"Failed to connect to Firestore: {str(e)}")
    
    def _test_connection(self):
        """Test the Firestore connection"""
        try:
            # Try to read from firestore (this will work even if collection doesn't exist)
            test_ref = self.db.collection('connection_test').document('test')
            test_ref.set({'connected_at': datetime.utcnow()})
            logger.info("🔗 Firestore connection test successful")
            
            # Clean up test document
            test_ref.delete()
        except Exception as e:
            raise Exception(f"Firestore connection test failed: {str(e)}")
    
    def get_db(self) -> firestore.Client:
        """Get Firestore database instance"""
        if not self._connected:
            return self.connect()
        return self.db
    
    def run_async(self, coro):
        """Helper to run async operations in sync context"""
        try:
            loop = asyncio.get_event_loop()
            if loop.is_running():
                # If event loop is already running, use executor
                future = asyncio.ensure_future(coro)
                return future
            else:
                return loop.run_until_complete(coro)
        except RuntimeError:
            # No event loop in current thread
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                return loop.run_until_complete(coro)
            finally:
                loop.close()
    
    async def create_collections_and_indexes(self):
        """Create default collections and sample data"""
        try:
            db = self.get_db()
            
            # Firestore creates collections automatically when you write data
            # We'll create some sample documents to initialize collections
            
            logger.info("📁 Initializing Firestore collections...")
            
            # Initialize collections by creating sample documents
            collections_init = [
                ('users', {'_type': 'collection_init', 'created_at': datetime.utcnow()}),
                ('chat_rooms', {'_type': 'collection_init', 'created_at': datetime.utcnow()}),
                ('messages', {'_type': 'collection_init', 'created_at': datetime.utcnow()}),
                ('user_sessions', {'_type': 'collection_init', 'created_at': datetime.utcnow()}),
                ('notifications', {'_type': 'collection_init', 'created_at': datetime.utcnow()})
            ]
            
            for collection_name, init_doc in collections_init:
                # Check if collection has any documents
                docs = db.collection(collection_name).limit(1).get()
                if not docs:
                    # Collection is empty, add initialization document
                    doc_ref = db.collection(collection_name).document('_init')
                    doc_ref.set(init_doc)
                    logger.info(f"✅ Initialized collection: {collection_name}")
                    
                    # Delete the init document after a moment
                    doc_ref.delete()
            
            logger.info("✅ Firestore collections initialized")
            
        except Exception as e:
            logger.error(f"❌ Error initializing collections: {e}")
    
    async def create_default_data(self):
        """Create default rooms and sample data"""
        try:
            db = self.get_db()
            
            # Default chat rooms
            default_rooms = [
                {
                    "room_id": "general",
                    "name": "General Discussion",
                    "description": "Welcome! Chat about anything here 💬",
                    "room_type": "general",
                    "members": [],
                    "moderators": ["system"],
                    "created_by": "system",
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow(),
                    "last_activity": datetime.utcnow(),
                    "is_active": True,
                    "is_public": True,
                    "max_members": None,
                    "settings": {
                        "allow_file_upload": True,
                        "allow_reactions": True,
                        "moderated": False,
                        "require_approval": False
                    },
                    "tags": ["general", "chat"]
                },
                {
                    "room_id": "study-help",
                    "name": "Study Help & Support", 
                    "description": "Get help with your studies and coursework 📚",
                    "room_type": "help",
                    "members": [],
                    "moderators": ["system"],
                    "created_by": "system",
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow(),
                    "last_activity": datetime.utcnow(),
                    "is_active": True,
                    "is_public": True,
                    "max_members": None,
                    "settings": {
                        "allow_file_upload": True,
                        "allow_reactions": True,
                        "moderated": True,
                        "require_approval": False
                    },
                    "tags": ["study", "help", "academic"]
                },
                {
                    "room_id": "project-collaboration",
                    "name": "Project Collaboration",
                    "description": "Work together on exciting projects 🚀",
                    "room_type": "project",
                    "members": [],
                    "moderators": ["system"],
                    "created_by": "system",
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow(),
                    "last_activity": datetime.utcnow(),
                    "is_active": True,
                    "is_public": True,
                    "max_members": 50,
                    "settings": {
                        "allow_file_upload": True,
                        "allow_reactions": True,
                        "moderated": False,
                        "require_approval": False
                    },
                    "tags": ["projects", "collaboration", "development"]
                },
                {
                    "room_id": "random-chat",
                    "name": "Random Chat",
                    "description": "Casual conversations and fun topics 🎉",
                    "room_type": "general",
                    "members": [],
                    "moderators": ["system"],
                    "created_by": "system",
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow(),
                    "last_activity": datetime.utcnow(),
                    "is_active": True,
                    "is_public": True,
                    "max_members": 100,
                    "settings": {
                        "allow_file_upload": False,
                        "allow_reactions": True,
                        "moderated": False,
                        "require_approval": False
                    },
                    "tags": ["random", "fun", "casual"]
                }
            ]
            
            # Create rooms if they don't exist
            for room_data in default_rooms:
                # Check if room exists
                existing_rooms = db.collection("chat_rooms").where("room_id", "==", room_data["room_id"]).get()
                
                if not existing_rooms:
                    # Create new room
                    doc_ref = db.collection("chat_rooms").document()
                    doc_ref.set(room_data)
                    logger.info(f"✅ Created room: {room_data['name']}")
                else:
                    logger.info(f"📁 Room already exists: {room_data['name']}")
                    
        except Exception as e:
            logger.error(f"❌ Error creating default data: {e}")
    
    def health_check(self) -> bool:
        """Check if Firestore connection is healthy"""
        try:
            if not self.db:
                return False
            
            # Try to read from Firestore
            test_ref = self.db.collection('health_check').document('test')
            test_ref.set({'checked_at': datetime.utcnow()})
            test_ref.delete()  # Clean up
            return True
        except Exception as e:
            logger.error(f"Firestore health check failed: {e}")
            return False
    
    def get_stats(self) -> Dict[str, Any]:
        """Get database statistics"""
        try:
            db = self.get_db()
            
            stats = {
                "database_type": "Firestore",
                "project_id": self.project_id,
                "connection_status": "connected" if self._connected else "disconnected",
                "timestamp": datetime.utcnow().isoformat()
            }
            
            # Get collection counts (Note: This is expensive in Firestore for large collections)
            # In production, you might want to maintain counters separately
            try:
                collections = ["users", "chat_rooms", "messages", "notifications"]
                for collection in collections:
                    docs = db.collection(collection).limit(1000).get()  # Limited count for performance
                    stats[f"{collection}_count"] = len(docs) if len(docs) < 1000 else "1000+"
            except Exception as e:
                stats["count_error"] = str(e)
            
            return stats
        except Exception as e:
            logger.error(f"Error getting database stats: {e}")
            return {"error": str(e)}
    
    def disconnect(self):
        """Disconnect from Firestore (cleanup)"""
        try:
            if self.app:
                firebase_admin.delete_app(self.app)
            self._connected = False
            self.db = None
            self.app = None
            self.executor.shutdown(wait=True)
            logger.info("🔥 Firebase Admin SDK disconnected")
        except Exception as e:
            logger.error(f"Error disconnecting from Firebase: {e}")

# Global Firestore instance
firestore_db = FirestoreConnection()
