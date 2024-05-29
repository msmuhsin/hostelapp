# Hostel Management System

## Overview

This Hostel Management System is a web-based application built using the MERN stack. It provides a comprehensive solution for managing hostel operations, including student management, room allocation and administrative tasks.

## Features

- **Student Management**: Add, view, edit, and delete student records.
- **Room Allocation**: Allocate rooms to students based on availability and preferences.
- **Authentication and Authorization**: Secure login system with role-based access controls.
- **Responsive UI**: User-friendly interface accessible on desktop and mobile devices.

## Technologies Used

- **Frontend**:
  - Next.JS (React Framework)
  - Shadcn-UI
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT (JSON Web Tokens) for authentication

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/yourusername/hostel-management-system.git`

### Backend Setup

1. **Install Dependencies**: `cd hostelapp && npm install`
2. **Set Environment Variables**: Create a `.env` file in the `backend` root directory and configure environment variables (e.g., database connection URI, JWT secret).

  Replace `<username>` and `<password>` with your MongoDB username and password. 


```javascript 
  MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.jyhlqh3.mongodb.net/hostelapp?retryWrites=true&w=majority&appName=Cluster0"
  PORT = 5000
  JWT_SECRET = "hostelapp123"
```
3. **Start the Application**:
   - Backend: `npm start`


### Frontend Setup

1. **Install Dependencies**: `cd frontend && npm install`
2. **Start the Application**: `npm run dev`

3. **Access the Application**: Open your web browser and navigate to `http://localhost:5000`.
