import json
from typing import Dict, Any, List

class MLModelService:
    def __init__(self):
        # Roadmap.sh style data structure
        self.roadmap_response = {
            "user_profile": {
                "name": "Test User",
                "career_goal": "AI Engineer",
                "experience_level": "Fresher",
                "estimated_duration": "12-18 months"
            },
            "career_outlook": {
                "summary": "AI Engineering is one of the fastest-growing fields with excellent career prospects. The roadmap follows industry best practices and real-world requirements.",
                "average_salary_entry_level": "₹8-25 LPA",
                "difficulty_level": "Intermediate to Advanced",
                "key_industries": ["Technology", "Healthcare", "Finance", "Automotive", "E-commerce"]
            },
            "roadmap": {
                "title": "AI Engineer Roadmap",
                "description": "Complete learning path to become an AI Engineer",
                "nodes": [
                    {
                        "id": "start",
                        "title": "Start Here",
                        "type": "start",
                        "status": "current",
                        "description": "Begin your AI Engineering journey",
                        "position": {"x": 500, "y": 50},
                        "connections": ["math-basics"]
                    },
                    {
                        "id": "math-basics",
                        "title": "Mathematics Foundation",
                        "type": "required",
                        "status": "locked",
                        "description": "Essential mathematical concepts for AI",
                        "duration": "2-3 months",
                        "position": {"x": 500, "y": 150},
                        "connections": ["programming-basics"],
                        "skills": [
                            "Linear Algebra",
                            "Calculus",
                            "Statistics",
                            "Probability Theory"
                        ],
                        "resources": [
                            {
                                "name": "3Blue1Brown - Linear Algebra",
                                "url": "https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
                                "type": "video"
                            },
                            {
                                "name": "Khan Academy - Statistics",
                                "url": "https://khanacademy.org/math/statistics-probability",
                                "type": "course"
                            }
                        ]
                    },
                    {
                        "id": "programming-basics",
                        "title": "Programming Fundamentals",
                        "type": "required",
                        "status": "locked",
                        "description": "Master Python and programming concepts",
                        "duration": "1-2 months",
                        "position": {"x": 500, "y": 280},
                        "connections": ["data-manipulation", "version-control"],
                        "skills": [
                            "Python Programming",
                            "Data Structures",
                            "Algorithms",
                            "Object-Oriented Programming"
                        ],
                        "resources": [
                            {
                                "name": "Python.org Tutorial",
                                "url": "https://docs.python.org/3/tutorial/",
                                "type": "documentation"
                            },
                            {
                                "name": "Automate the Boring Stuff",
                                "url": "https://automatetheboringstuff.com/",
                                "type": "book"
                            }
                        ]
                    },
                    {
                        "id": "version-control",
                        "title": "Git & Version Control",
                        "type": "required",
                        "status": "locked",
                        "description": "Essential for collaborative development",
                        "duration": "1 week",
                        "position": {"x": 300, "y": 380},
                        "connections": ["ml-basics"],
                        "skills": [
                            "Git Commands",
                            "GitHub/GitLab",
                            "Branching & Merging",
                            "Collaboration Workflows"
                        ],
                        "resources": [
                            {
                                "name": "Pro Git Book",
                                "url": "https://git-scm.com/book",
                                "type": "book"
                            }
                        ]
                    },
                    {
                        "id": "data-manipulation",
                        "title": "Data Manipulation",
                        "type": "required",
                        "status": "locked",
                        "description": "Work with data using Python libraries",
                        "duration": "3-4 weeks",
                        "position": {"x": 700, "y": 380},
                        "connections": ["ml-basics"],
                        "skills": [
                            "Pandas",
                            "NumPy",
                            "Data Cleaning",
                            "Data Visualization (Matplotlib, Seaborn)"
                        ],
                        "resources": [
                            {
                                "name": "Pandas Documentation",
                                "url": "https://pandas.pydata.org/docs/",
                                "type": "documentation"
                            },
                            {
                                "name": "Kaggle Learn - Pandas",
                                "url": "https://kaggle.com/learn/pandas",
                                "type": "course"
                            }
                        ]
                    },
                    {
                        "id": "ml-basics",
                        "title": "Machine Learning Fundamentals",
                        "type": "required",
                        "status": "locked",
                        "description": "Core ML algorithms and concepts",
                        "duration": "2-3 months",
                        "position": {"x": 500, "y": 500},
                        "connections": ["ml-advanced", "deep-learning"],
                        "skills": [
                            "Supervised Learning",
                            "Unsupervised Learning",
                            "Model Evaluation",
                            "Scikit-learn",
                            "Feature Engineering"
                        ],
                        "resources": [
                            {
                                "name": "Andrew Ng's ML Course",
                                "url": "https://coursera.org/learn/machine-learning",
                                "type": "course"
                            },
                            {
                                "name": "Hands-On ML Book",
                                "url": "https://github.com/ageron/handson-ml2",
                                "type": "book"
                            }
                        ]
                    },
                    {
                        "id": "ml-advanced",
                        "title": "Advanced ML Techniques",
                        "type": "optional",
                        "status": "locked",
                        "description": "Advanced algorithms and techniques",
                        "duration": "2-3 months",
                        "position": {"x": 300, "y": 650},
                        "connections": ["mlops"],
                        "skills": [
                            "Ensemble Methods",
                            "Gradient Boosting",
                            "Hyperparameter Tuning",
                            "Cross-validation",
                            "Model Selection"
                        ],
                        "resources": [
                            {
                                "name": "XGBoost Documentation",
                                "url": "https://xgboost.readthedocs.io/",
                                "type": "documentation"
                            }
                        ]
                    },
                    {
                        "id": "deep-learning",
                        "title": "Deep Learning",
                        "type": "required",
                        "status": "locked",
                        "description": "Neural networks and deep learning",
                        "duration": "3-4 months",
                        "position": {"x": 700, "y": 650},
                        "connections": ["dl-specialization", "mlops"],
                        "skills": [
                            "Neural Networks",
                            "TensorFlow/Keras",
                            "PyTorch",
                            "Backpropagation",
                            "Regularization Techniques"
                        ],
                        "resources": [
                            {
                                "name": "Deep Learning Specialization",
                                "url": "https://coursera.org/specializations/deep-learning",
                                "type": "course"
                            },
                            {
                                "name": "PyTorch Tutorials",
                                "url": "https://pytorch.org/tutorials/",
                                "type": "tutorial"
                            }
                        ]
                    },
                    {
                        "id": "dl-specialization",
                        "title": "DL Specialization",
                        "type": "choice",
                        "status": "locked",
                        "description": "Choose your specialization",
                        "duration": "2-3 months",
                        "position": {"x": 900, "y": 750},
                        "connections": ["projects"],
                        "specializations": [
                            {
                                "name": "Computer Vision",
                                "skills": ["CNNs", "Image Processing", "OpenCV", "Object Detection"],
                                "resources": [
                                    {
                                        "name": "CS231n Course",
                                        "url": "http://cs231n.stanford.edu/",
                                        "type": "course"
                                    }
                                ]
                            },
                            {
                                "name": "Natural Language Processing",
                                "skills": ["NLP", "Transformers", "BERT", "GPT", "Hugging Face"],
                                "resources": [
                                    {
                                        "name": "Hugging Face Course",
                                        "url": "https://huggingface.co/course",
                                        "type": "course"
                                    }
                                ]
                            },
                            {
                                "name": "Reinforcement Learning",
                                "skills": ["Q-Learning", "Policy Gradients", "Actor-Critic", "OpenAI Gym"],
                                "resources": [
                                    {
                                        "name": "Spinning Up in Deep RL",
                                        "url": "https://spinningup.openai.com/",
                                        "type": "course"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "mlops",
                        "title": "MLOps & Deployment",
                        "type": "required",
                        "status": "locked",
                        "description": "Production ML systems",
                        "duration": "2-3 months",
                        "position": {"x": 500, "y": 800},
                        "connections": ["projects"],
                        "skills": [
                            "Docker",
                            "Kubernetes",
                            "AWS/GCP/Azure",
                            "Model Serving",
                            "CI/CD for ML",
                            "Monitoring & Logging"
                        ],
                        "resources": [
                            {
                                "name": "MLOps Course",
                                "url": "https://madewithml.com/",
                                "type": "course"
                            },
                            {
                                "name": "Docker Tutorial",
                                "url": "https://docker-curriculum.com/",
                                "type": "tutorial"
                            }
                        ]
                    },
                    {
                        "id": "projects",
                        "title": "Portfolio Projects",
                        "type": "milestone",
                        "status": "locked",
                        "description": "Build real-world projects",
                        "duration": "3-6 months",
                        "position": {"x": 500, "y": 950},
                        "connections": ["job-prep"],
                        "project_ideas": [
                            "End-to-End ML Pipeline",
                            "Computer Vision Application",
                            "NLP Chatbot or Sentiment Analysis",
                            "Recommendation System",
                            "Time Series Forecasting",
                            "MLOps Pipeline with CI/CD"
                        ],
                        "skills": [
                            "Project Planning",
                            "Full-Stack Development",
                            "API Development",
                            "Database Design",
                            "System Design"
                        ]
                    },
                    {
                        "id": "job-prep",
                        "title": "Job Preparation",
                        "type": "milestone",
                        "status": "locked",
                        "description": "Prepare for AI Engineer roles",
                        "duration": "1-2 months",
                        "position": {"x": 500, "y": 1100},
                        "connections": ["success"],
                        "skills": [
                            "Technical Interviews",
                            "System Design",
                            "Coding Practice",
                            "Portfolio Building",
                            "Resume Writing",
                            "Networking"
                        ],
                        "resources": [
                            {
                                "name": "LeetCode",
                                "url": "https://leetcode.com/",
                                "type": "practice"
                            },
                            {
                                "name": "ML Interview Guide",
                                "url": "https://github.com/alexeygrigorev/ml-interviews-book",
                                "type": "book"
                            }
                        ]
                    },
                    {
                        "id": "success",
                        "title": "AI Engineer Ready!",
                        "type": "success",
                        "status": "locked",
                        "description": "Congratulations! You're ready for AI Engineer roles",
                        "position": {"x": 500, "y": 1200},
                        "connections": [],
                        "next_steps": [
                            "Apply to AI Engineer positions",
                            "Continue learning advanced topics",
                            "Contribute to open source projects",
                            "Build a personal brand",
                            "Mentor others"
                        ]
                    }
                ]
            }
        }
    
    async def generate_career_roadmap(self, user_input: Dict[str, Any]) -> Dict[str, Any]:
        """Return roadmap.sh style data structure"""
        
        response = self.roadmap_response.copy()
        
        # Update user profile
        if "name" in user_input:
            response["user_profile"]["name"] = user_input["name"]
        if "career_goal" in user_input:
            response["user_profile"]["career_goal"] = user_input["career_goal"]
        if "experience_level" in user_input:
            response["user_profile"]["experience_level"] = user_input["experience_level"]
        
        return response

# Create global instance
ml_service = MLModelService()
