#  ElevateAI – Your Personal AI Learning & Career Companion

<p align="center">
  <img src="https://github.com/pranao0609/ElevateAI/blob/main/IMAGE1" alt="ElevateAI Banner" width="90%">
</p>

ElevateAI is an advanced AI-powered platform designed to help students, developers, and professionals accelerate their learning and career growth.
It leverages **Groq LLMs**, **Generative AI pipelines**, **intelligent agents**, and a modern **full-stack architecture** to deliver fast, accurate, and personalized guidance.

**Live Demo:** [https://student-advisor-portal.vercel.app/](https://student-advisor-portal.vercel.app/)


#  Vision

Today’s learners struggle with:

* Unstructured content
* Too many resources
* No personalized guidance
* No clarity in career direction
* No dedicated AI mentor to rely on

**ElevateAI solves all of this** by becoming your personal digital guide for skills, careers, and learning.

---

#  What ElevateAI Does

###  1. **Career Recommender**

* Recommends the best career tracks based on your skills, interests, and goals.
* Generates detailed role descriptions, required skills, preparation timelines, and growth paths.
* Supports domains like Software Engineering, AI/ML, Cybersecurity, Web Dev, Cloud, and more.

###  2. **AI Roadmap Generator**

* Creates a full personalized roadmap for:

  * Python
  * Machine Learning
  * Data Science
  * Deep Learning
  * NLP
  * GenAI
  * DSA
  * Web Development
  * Cloud & DevOps
* Roadmaps are structured with phases, timelines, topics, resources, and practice tasks.

###  3. **Practice Assessment Generator**

* Auto-generates quizzes and assessments for any topic.
* Supports MCQs, coding questions, theory questions, and skill-based tasks.
* Helps track progress and identify weaknesses.

###  4. **AI Mentor**

* Acts as a 24×7 mentor for:

  * Doubt solving
  * Concept explanation
  * Project guidance
  * Study plans
  * Interview help
* Uses Groq’s fast inference for real-time responses.

###  5. **Smart Chatbot**

* Conversational interface to interact with all AI agents.
* Context-aware answers, session memory, and structured outputs.
* Handles Q&A, task planning, study doubts, and resource recommendations.

###  6. **Resource Curator**

* Fetches the best:

  * Docs
  * YouTube videos
  * GitHub repos
  * Articles
* Provides curated learning paths and explains how to use each resource.

###  7. **Dashboard**

* Clean, modern UI built with React + Tailwind.
* Shows your recommended tracks, roadmaps, assessments, and AI conversations.

<p align="center">
<img src="https://github.com/pranao0609/ElevateAI/blob/main/IMAGE2" alt="Screenshot 1" width="30%"> 
<img src="https://github.com/pranao0609/ElevateAI/blob/main/IMAGE3" alt="Screenshot 2" width="30%">
<img src="https://github.com/pranao0609/ElevateAI/blob/main/IMAGE4" alt="Screenshot 3" width="30%">
</p>

---

#  Tech Stack

###  **Backend**

* FastAPI
* Python
* LangChain
* Groq LLMs
* Semantic caching
* Async architecture

###  **AI / ML**

* Groq Llama 3.1 & Mixtral models
* Embeddings + vector search
* Prompt pipelines using LangChain
* Recommendation & roadmap generation logic

###  **Frontend**

* React.js
* TailwindCSS
* Framer Motion
* Context-based state management

###  **Database**

* Google Firestore

###  **Deployment**

* Frontend → Vercel (Live: [https://student-advisor-portal.vercel.app/](https://student-advisor-portal.vercel.app/))
* Backend → Google Cloud Run
* CI/CD → GitHub Actions
* Dockerized services

---

#  Installation Guide

```bash
# Clone the repository
git clone https://github.com/pranao0609/ElevateAI.git
cd ElevateAI
```

### 🔧 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
