# Make_My_Trip_Clone_Website
# ✈️ MakeMyTrip Clone – MERN Stack Travel Booking Portal

A full-stack travel booking web app inspired by MakeMyTrip, built using **MongoDB, Express.js, React, and Node.js**, allowing users to search and book flights and hotels, and includes a secure admin dashboard for managing listings.

---

## 🧠 Features

### 👭 User Side
- Register & Login (JWT-based authentication)
- Search flights and hotels
- Apply filters (e.g., price, date, location, rating, amenities)
- Book flights and hotels
- View booking history

### 🛠️ Admin Side
- Secure Admin Login (with role-based access)
- Manage (CRUD) flights and hotels
- View bookings
- Admin Dashboard

---

## 📁 Project Structure

```
client/              # React frontend
│
└── src/
    ├── pages/       # Home, Flights, Hotels, Login, Register, etc.
    ├── components/  # Navbar, ProtectedRoutes
    └── App.js       # Routing and layout
    

server/              # Express backend
│
├── models/          # Mongoose models (User, Flight, Hotel, Booking)
├── routes/          # All route files (auth, flights, hotels, admin)
├── middleware/      # Auth middlewares           
└── server.js        # App entry point
```

---

## ⚙️ Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Tokens)
- **Deployment**: Render / Heroku / Vercel / Railway (choose one)

---

## 🧪 Setup Instructions

### 🔧 Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Git

### 📦 Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yashubaghel/makemytrip-clone.git
cd makemytrip-clone
```

#### 2. Install server dependencies
```bash
cd server
npm install
```

#### 3. Install client dependencies
```bash
cd ../client
npm install
```

---

## 🔑 Environment Variables

### For Backend (`/server/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the App Locally

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
cd client
npm start
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

---

## 🛫 Deployment Instructions

You can deploy using **Render**, **Vercel**, or **Railway**.

### 🧑‍💻 Backend on Render:
1. Push your code to GitHub.
2. Create a new Web Service on Render.
3. Link the GitHub repo.
4. Set build command: `npm install`  
   Set start command: `node server.js` or `npm run dev`
5. Add environment variables in Render dashboard.

### 🌐 Frontend on Vercel:
1. Install Vercel CLI:
```bash
npm install -g vercel
```
2. Deploy:
```bash
cd client
vercel
```

---

## 📘 Usage Instructions

### 👤 For Users:
- Go to homepage
- Register or login
- Search for flights or hotels
- Apply filters and view listings
- Book your flight/hotel
- View "User Bookings"

### 🧑‍💼 For Admin:
- Go to `/admin/login`
- Use admin credentials
- Access dashboard and manage listings

---

## 🔐 Security & Optimization

- JWT-based auth with route protection
- Admin-only access using `PrivateAdminRoute`
- Input validation using middleware
- Pagination and filters for scalability

---

## 💄 UI/UX Enhancements

- Responsive design using Bootstrap
- Flight & Hotel Cards layout
- Clear navigation with Navbar
- Toasts or Alerts for feedback (can be added)

---

## 🧹 Optional: Seeding Data

To seed flights/hotels:
```bash
node utils/seedFlights.js
node utils/seedHotels.js
```

Make sure the scripts connect to your MongoDB URI.

---

## 😇 Support

For any issues, reach out to `yashubaghel2019@gmail.com` or raise an issue on the GitHub repo.

---

## 🏑 Final Checklist

[✅] Frontend & Backend integrated
[✅] User + Admin auth working
[✅] Flight & Hotel search with filters
[✅] Booking functionality
[✅] Admin CRUD operations
[✅] Fully responsive UI
[✅] Final deployment done

