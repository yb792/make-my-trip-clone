// src/pages/Hotels.js
import React, { useState } from 'react';
import axios from 'axios';

const Hotels = () => {
  const [location, setLocation] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [amenities, setAmenities] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/hotels/search`, {
        params: { location, checkinDate, minPrice, maxPrice, rating, amenities, sortBy },
      });
      setHotels(data);
      setError('');
      setSuccess('');
    } catch (err) {
      setHotels([]);
      setError('No hotels found for selected filters.');
    }
  };

  const handleBook = async (hotel) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to book a hotel.');
      setSuccess('');
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/bookings/hotel`, {
        hotel: hotel._id,
        totalPrice: hotel.price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('✅ Hotel booked successfully!');
      setError('');
    } catch (err) {
      setError('❌ Hotel booking failed.');
      setSuccess('');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">🏨 Find the Perfect Stay</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="📍 Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Min ₹" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Max ₹" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Min Rating</option>
            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} ⭐</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="🛁 Amenities (comma separated)" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priceAsc">💰 Price: Low to High</option>
            <option value="priceDesc">💸 Price: High to Low</option>
            <option value="rating">🌟 Top Rated</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100 fw-semibold" onClick={handleSearch}>🔍 Search</button>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}

      <div className="row">
        {hotels.length === 0 && !error && (
          <p className="text-center text-muted">No hotels to display yet. Try a search! 🏨</p>
        )}

        {hotels.map((hotel) => (
          <div key={hotel._id} className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary fw-bold">{hotel.name}</h5>
                <p><strong>📍 Location:</strong> {hotel.location}</p>
                <p><strong>⭐ Rating:</strong> {hotel.rating}</p>
                <p><strong>💰 Price:</strong> ₹{hotel.price} / night</p>
                <p><strong>🛎 Amenities:</strong> {hotel.amenities.join(', ')}</p>
                <button className="btn btn-success mt-auto" onClick={() => handleBook(hotel)}>🛏 Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
