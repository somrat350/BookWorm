# 📚 BookWorm - Personalized Book Recommendation & Reading Tracker

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-1F2937?logo=nextauth.js&logoColor=white)](https://next-auth.js.org/)
[![imgbb](https://img.shields.io/badge/imgbb-FFCC00?logo=imgbb&logoColor=white)](https://imgbb.com/)


[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://book-worm-topaz.vercel.app)

---

## 🚀 Project Overview

**BookWorm** is a modern **web application for book lovers**, built with **Next.js, Node.js, MongoDB, and NextAuth**.  
It allows users to:

- Discover and track books
- Maintain personalized reading shelves
- Write and read reviews
- Receive personalized recommendations
- Track reading goals and stats
- Watch curated book tutorials

---

## 👥 User Roles

### **Normal User**
- Browse & search books by title, author, genre, rating
- Add books to shelves: Want to Read, Currently Reading, Read
- Track reading progress (% or pages)
- Write reviews & give ratings
- Receive personalized book recommendations
- Participate in reading challenges with stats & charts
- Watch embedded YouTube tutorials

### **Admin**
- Manage users: promote/demote
- Manage books: add, edit, delete
- Manage genres
- Moderate reviews: approve/delete
- Manage tutorials: add/edit/delete embedded YouTube videos
- View admin dashboard with analytics & charts

---

## 🛠 Features

- Fully responsive (mobile, tablet, desktop)
- Server-side authentication using **NextAuth**
- Image uploads via **imgbb**
- Role-based access control (Normal User / Admin)
- Personalized recommendations & reading stats
- Search, filter, and sort books
- Reading challenges with charts (Chart.js / Recharts)
- Admin analytics dashboard

---

## 🎨 Design & UI

- Cozy library-inspired theme
- Warm and inviting color palette
- Interactive dashboards & reading charts
- Smooth transitions and loading states
- Clean, modern, and intuitive navigation
- Fully responsive layout for all devices

---

## 💻 Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | Next.js, Tailwind CSS, React Icons |
| Backend    | Node.js, Express.js |
| Database   | MongoDB |
| Auth       | NextAuth.js |
| Image Hosting | imgbb |
| Charts     | Chart.js / Recharts |
| Deployment | Vercel (frontend), Render / Heroku (backend) |

---

## 🏗️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/somrat350/BookWorm.git
```
### 2. Install dependencies
```bash
cd BookWorm
npm install
```
### 3. Configure environment variables
```bash
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_db_name
IMG_BB_API=your_imgBB_api
NEXT_PUBLIC_IMG_BB_API=your_imgBB_api
NEXTAUTH_SECRET=your_next_auth_secret

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
### 4. Run the application
```bash
npm run dev
```

---
## 📷 Screenshot