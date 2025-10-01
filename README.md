# ElevateAI – Google GenAI Hackathon Project  

ElevateAI is an AI-powered platform built for the **Google GenAI Hackathon 2025**.  
It leverages **Google Vertex AI, Generative AI models, and modern full-stack frameworks** to deliver intelligent, scalable, and user-friendly solutions.  

---

## Problem Statement  
Traditional AI applications are either too complex for end-users or lack real-world integration.  
We wanted to create a system that **simplifies access to Generative AI** for learning, productivity, and innovation.  

---

## Our Solution  
ElevateAI provides:  
-  **AI Agents** that guide users through tasks.  
-  **Personalized learning roadmaps** using GenAI.  
-  **Context-aware search & recommendations**.  
-  **Conversational interface** for seamless interaction.  
-  **Localization & accessibility support**.  

---

## Features  
- AI Roadmap Generation (Python, ML, Data Science, etc.)  
- Smart Question Answering with GenAI  
- Resource Curation (articles, videos, GitHub repos)  
- Real-time Fault Detection & Alerts (if relevant to your modules)  
- Interactive Dashboard UI with **Streamlit / React + Leaflet**  

---

## Tech Stack  
- **Backend:** Python, FastAPI  
- **AI/ML:** Google Vertex AI, LangChain, Scikit-learn, PyTorch  
- **Frontend/UI:** React.js, TailwindCSS  
- **Database:** Firestore 
- **Deployment:** Docker, Google Cloud Run  

---

## ⚙️ Installation  

```bash
# Clone the repo
git clone https://github.com/pranao0609/ElevateAI.git
cd ElevateAI

cd backend
pip install -r requirements.txt
uvicorn main:app --reload


cd frontend
npm install
npm run dev
