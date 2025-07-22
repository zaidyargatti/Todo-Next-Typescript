# 📝 Advanced TODO App — Full Stack Project with Authentication & i18n

Welcome to the **Advanced TODO App** built using a modern full stack architecture — designed to impress recruiters 🚀

## 📌 Tech Stack

### 🔧 Backend (Node.js + Express + MongoDB + TypeScript)
- Express.js with TypeScript
- MongoDB + Mongoose
- JWT Authentication
- REST API with clean MVC structure

### 🎯 Frontend (Next.js + TailwindCSS + TypeScript)
- Next.js 15
- TailwindCSS
- React Hook Form + Toastify
- i18n support via `next-i18next`
- Axios for API calls
- Fully responsive and clean UI

---

## 🔐 Features

- ✅ User Signup / Login with JWT
- ✅ Protected TODO Dashboard (auth-guarded)
- ✅ Add, Edit, Delete TODOs
- ✅ Deadline support via date input
- ✅ Multilingual Support (🌐 English + हिंदी)
- ✅ Dynamic Navbar with API-driven links
- ✅ Toast notifications for all actions
- ✅ Deployment-ready for **Render**

---

## 📁 Folder Structure

📦 project-root/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── utils/
├── frontend/
│ ├── pages/
│ ├── components/
│ ├── context/
│ └── public/locales/

yaml
Copy
Edit

---

## 🛠️ Backend Setup (Express + MongoDB + TypeScript)


cd backend
npm install
# Create a `.env` file:
PORT=4000
MONGO_URI=Your Mongo URL
JWT_SECRET=yourSecretKey

# Start the server
npm run dev

💻 Frontend Setup (Next.js + Tailwind + i18n)
cd frontend
npm install

# Start dev server
npm run dev
and use localhost on 4000

# Accessible at: https://todo-next-typescript-eight.vercel.app/login
