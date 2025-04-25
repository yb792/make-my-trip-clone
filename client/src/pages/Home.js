// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center my-5">
    <h1 className="display-4 text-primary">🌍 Welcome to Yashu's Travel Portal</h1>
    <p className="lead text-muted">Book cheap flights & hotels across India</p>
    <div className="d-grid gap-2 d-md-block mt-4">
      <Link to="/flights" className="btn btn-outline-primary me-2">✈️ Flights</Link>
      <Link to="/hotels" className="btn btn-outline-success">🏨 Hotels</Link>
    </div>
  </div>
);

export default Home;  // Make sure this line is included
