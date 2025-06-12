import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateAdminRoute from './components/PrivateAdminRoute';

import Payment from './pages/Payment'; // ✅ FIXED: Corrected import name
import PaymentSuccess from './pages/PaymentSuccess';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBookings from './pages/UserBookings';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageFlights from './pages/ManageFlights';
import ManageHotels from './pages/ManageHotels';

import Home from './pages/Home';  // ✅ Home page component

import './App.css';

function App() {
  const isAdminLoggedIn = !!localStorage.getItem('adminToken');

  return (
    <Router>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">MakeMyTrip Clone</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/flights">Flights</Nav.Link>
              <Nav.Link as={Link} to="/hotels">Hotels</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/user-bookings">User Bookings</Nav.Link>
              <Nav.Link as={Link} to="/admin/login">Admin</Nav.Link>

              {/* Only visible to admin if logged in */}
              {isAdminLoggedIn && (
                <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
              )}

              {/* ❌ Removed direct Pay link - only navigate via booking */}
              {/* <Nav.Link as={Link} to="/payment">Pay</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Container className="my-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-bookings" element={<UserBookings />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/payment" element={<Payment />} /> {/* ✅ Fixed */}
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateAdminRoute>
                <AdminDashboard />
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/flights"
            element={
              <PrivateAdminRoute>
                <ManageFlights />
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/hotels"
            element={
              <PrivateAdminRoute>
                <ManageHotels />
              </PrivateAdminRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
