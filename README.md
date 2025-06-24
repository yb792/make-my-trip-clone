![Backend CI](https://github.com/yb792/make-my-trip-clone/actions/workflows/server-ci.yml/badge.svg)


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
- Payment integration using Paypal

### 🛠️ Admin Side
- Secure Admin Login (with role-based access)
- Manage (CRUD) flights and hotels
- View bookings
- Admin Dashboard

---

## 📁 Project Structure

```
client/ # React frontend
└── build 
│
└── src/
    ├── pages/                 # AdminDashboard, AdminLogin, Home, Flights, Hotels, Login, ManageFlights, ManageHotels, Register, Payment, PaymentSuccess
    ├── components/            # BookingButton.js, FlightCard.js, FlightSearchResults.js, HotelCard.js, Navbar.js, PrivateAdminRoutes.js
    └── App.js                 # Routing and layout
    └── index.js               # Scripting file
    └── App.cs                 # Styling file
    └── .env                   # environment variables containing backend url
    └── package-lock.json      # dependency files
    └── package.json  

server/              # Express backend
│
├── models/                # Mongoose models (User, Flight, Hotel, Booking)
├── routes/                # All route files (auth, flights, hotels, admin)
├── tests                  # auth, flight, and hotel search test cases
├── middleware/            # Auth middlewares           
└── server.js              # App entry point
└── .env                   # environment variables containing Mongo_URI, JWT_Secret_Key and PORT
└── seedAdmin.js           # for seeding admin
└── seedFlights.js         # for seeding Flights
└── seedHotels.js          # for seeding Hotels
└── package-lock.json      # dependency files
└── package.json  

```

---

## ⚙️ Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Tokens)
- **Deployment**: Render and Netlify

---

## 🧪 Setup Instructions

### 🔧 Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Git

### 📦 Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yb792/make-my-trip-clone.git
cd makemytrip-clone
```

#### 2. Install server dependencies
```bash
cd server
npm install
```

#### 3. Install client dependencies
```bash
cd client
npm install
```

---

## 🔑 Environment Variables

### For Backend (`/server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://yashu09:Yashu%4009@cluster0.lfs7axk.mongodb.net/mmtCloneDB?retryWrites=true&w=majority
JWT_SECRET=e57014cf946eaaf80150efb2833bfe5982f03c7cc825b0abbc5fc1120e978ca1e1b77d101e30045c74d190f6187b043915fb7c9eed74051c203ccff8a58d86061f59c8d5b079a3688c6d7d91a17a5589f7b33cd282e66804d1cc5c7879b022c9c0f0fa80d95096b20bfb40bd6d8d088511dd4d75ee42101baa102e9e914c0c0d3cd278c50b01d4fbe4487da43e2a0f7e9245ff8122c924e98c4d4c0d0f8b364919627cd0f48bd20b4c09fe4856a16e0e387df75b4fe056623e2f8b1a2c171c626a78cffff64152aa79d918d8113539597a100ac435e285f802098f1828d34ccecce13f33a60d988c164c2cc9c20a117f5ea9a202be606166ba04a040d73c5e55
```

---

## ▶️ Running the App Locally

### Start Backend
```bash
cd server
npm start
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

You can deploy using **Render**and **Netlify**
### 🧑‍💻 Backend on Render:
1. Push your code to GitHub.
2. Create a new Web Service on Render.
3. Link the GitHub repo.
4. Set build command: `npm install`  
   Set start command: `npm start`
5. Add environment variables in Render dashboard.
   

### 🌐 Frontend on Netlify:
1. Push your code to GitHub.
2. Click "Add new site" → Import from GitHub
3. Link the GitHub repo.
4. Set build command: `npm run build`  
   Set start command: `npm start
   Set publish directory: client/build
5. Add environment variables in Netlify dashboard

**Deployed Links:** 
**Frontend**: https://spectacular-blini-9ce730.netlify.app
**Backend**: https://make-my-trip-clone-1-5wtu.onrender.com
*Note*: Firstly run *Backend* and then run *Frontend* 

**User credentials**
**User Login**: email: yashubaghel2019@gmail.com
                password: Yashu@123
                **name: Yashu Baghel (if asking of registration or said invalid credentials on logging in)**
                Search flights from Delhi to Mumbai for 30/06/2025
                Seach hotels in Delhi, Mumbai and Goa for 30/06/2025
**Admin Login**: email: yashu09@gmail.com
                 password: Yashu@09


 ### Payment Integration 

 Login in using Paypal Sandbox Personal(Buyer) Test Account

Paypal Sandbox Test account credentials -Personal account - login email - sb-edriy44082157@personal.example.com
                                                            pass - ZGmOl_f0
                                         Business account -  login email - sb-hv6ms36840023@business.example.com
                                                            pass - 8H.|rjgt

 ## 🧪 Testing

This project includes automated test cases for:

- 🔐 User Authentication
- ✈️ Flight Search
- 🏨 Hotel Search

### 📦 Run Tests Locally

MongoDB is running locally or set `MONGO_URI` in `.env`.

Then run:

```bash
cd server
npm test


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

## 🖌️I/UX Enhancements

- Responsive design using Bootstrap
- Flight & Hotel Cards layout
- Clear navigation with Navbar
- Toasts or Alerts for feedback (can be added)

---

## 🧹 Optional: Seeding Data

To seed flights/hotels:
```bash
seedFlights.js
seedHotels.js
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

