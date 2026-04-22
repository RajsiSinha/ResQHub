# 🚨 ResQHub — Incident Response & Coordination Platform

ResQHub is a full-stack MERN-based web application designed to streamline incident reporting, assignment, and resolution through a structured and role-based workflow.

---

## 🌟 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Password hashing using bcrypt
- Role-Based Access Control (RBAC)

### 👥 Multi-Role System
- **Victim** → Report incidents
- **Admin** → Manage and assign incidents
- **Responder** → Handle and resolve incidents

### 📊 Incident Management
- Create, view, assign, and update incidents
- Status tracking: `PENDING → ASSIGNED → RESOLVED`
- Severity-based reporting

### 🗺️ Safety & Awareness
- Safety Map using Leaflet (location context)
- Emergency resources and helpline numbers
- SOS quick access feature

### 📡 System Design
- RESTful API architecture
- Modular backend structure
- Scalable and extensible design

---

## 🧠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)
- bcrypt

---

## 🏗️ Project Structure

resqhub/
├── frontend/
├── backend/
├── .gitignore
├── README.md

---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run server:

npm run dev

💻 Frontend
cd frontend
npm install
npm run dev
