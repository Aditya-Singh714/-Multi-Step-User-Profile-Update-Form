# 🧩 Multi-Step User Profile Update Form

A full-stack, multi-step user profile update form built with **React**, **Node.js**, **Express**, and **MongoDB**. This project features real-time validation, password strength checking, profile photo upload, and form data persistence.

Live Demo:

- 🔗 Frontend: [https://multi-step-user-profile-update-form-omega.vercel.app](https://multi-step-user-profile-update-form-omega.vercel.app)
- 🔗 Backend: [https://multi-step-user-profile-update-form-85cj.onrender.com](https://multi-step-user-profile-update-form-piph.onrender.com)

---

## 🚀 Features

- ✅ Multi-step form with progress control
- 🧠 Real-time field validation
- 🔐 Password strength meter and current password requirement
- 🖼️ Profile photo upload
- 🌍 Dynamic country, state, city selection
- 📩 Newsletter opt-in
- 📛 Username availability check via API
- 📦 Data stored in MongoDB Atlas
- 🌐 Frontend hosted on Vercel, backend on Render

---

## 🛠️ Tech Stack

| Frontend             | Backend             | Database      |
| -------------------- | ------------------- | ------------- |
| React + Tailwind CSS | Node.js + Express   | MongoDB Atlas |
| Framer Motion        | CORS Middleware     | Mongoose      |
| Axios                | Multer (for upload) |               |

---

## 🧬 Folder Structure (Frontend)

src/
│
├── components/ # UI components
├── pages/ # Step1.jsx - Step5.jsx
├── utils/ # Axios instance
├── assets/ # Icons & images
└── App.jsx # Root app

---



## ⚙️ API Endpoints

- `POST /api/profile` → Submit profile form
- `GET /api/check-username/:username` → Check if username is taken
- `POST /api/upload` → Upload profile photo (Multer)
- `POST /api/verify-password` _(optional if using)_ → Verify current password

---

## 🧪 Run Locally

### Frontend

- cd frontend
- npm install
- npm run dev

## Backend

- cd backend
- npm install
- node app.js

### 📦 Deployment
Frontend: Deployed on Vercel

Backend: Deployed on Render

### Make sure to:

Whitelist your current IP in MongoDB Atlas

Allow CORS for your frontend domain in Express config

### 🧑‍💻 Author
Made with ❤️ by Aditya Singh

```
