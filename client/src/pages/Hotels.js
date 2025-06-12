import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rating, setRating] = useState('');
  const [amenities, setAmenities] = useState('');
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const params = { location, checkinDate, minPrice, maxPrice, rating, amenities, sortBy };
      const { data } = await axios.get('/api/hotels/search', { params });
      setHotels(data);
    } catch (err) {
      console.error('❌ Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const handleBookHotel = (hotel) => {
    const bookingDetails = {
      type: 'hotel',
      hotel: hotel._id,
      totalPrice: hotel.price,
      price: hotel.price,
    };
    navigate('/payment', { state: { bookingDetails } });
  };

  return (
    <div className="container my-4">
      <h2 className="text-success mb-4">🏨 Search Hotels</h2>

      <Form onSubmit={handleFilterSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Form.Control
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Rating</option>
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐ & above</option>
            <option value="3">3 ⭐ & above</option>
          </Form.Select>
        </div>
        <div className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Amenities (comma-separated)"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </Form.Select>
        </div>
        <div className="col-md-2">
          <Button type="submit" variant="success" className="w-100">Search</Button>
        </div>
      </Form>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : hotels.length === 0 ? (
        <p>No hotels found for the selected criteria.</p>
      ) : (
        <div className="row">
          {hotels.map((hotel) => (
            <div className="col-md-4 mb-4" key={hotel._id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="text-success">{hotel.name}</h5>
                  <p><strong>{hotel.location}</strong></p>
                  <p>⭐ {hotel.rating} | ₹ {hotel.price}</p>
                  <p>Amenities: {(hotel.amenities || []).join(', ')}</p>
                  <Button variant="success" onClick={() => handleBookHotel(hotel)}>Book Now</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;
