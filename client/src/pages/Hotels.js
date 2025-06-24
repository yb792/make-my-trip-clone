import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [rating, setRating] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const params = { location, checkInDate, rating, minPrice, maxPrice, sortBy };
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/search`, { params });
      setHotels(Array.isArray(data) ? data : data.hotels || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleBookHotel = (hotel) => {
    const bookingDetails = {
      type: 'hotel',
      hotel: hotel._id,
      totalPrice: hotel.price,
      price: hotel.price,
      checkInDate: checkInDate,
    };
    navigate('/payment', { state: { bookingDetails, type: 'hotel' } });
  };

  return (
    <div className="container my-4">
      <h2 className="text-primary mb-4">🏨 Search Hotels</h2>
      <Form onSubmit={(e) => { e.preventDefault(); fetchHotels(); }} className="row g-3 mb-4">
        {/* Filter Inputs */}
        <div className="col-md-2"><Form.Control type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /></div>
        <div className="col-md-2"><Form.Control type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} /></div>
        <div className="col-md-2"><Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All Ratings</option>
          <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
          <option value="4">⭐️⭐️⭐️⭐️</option>
          <option value="3">⭐️⭐️⭐️</option>
        </Form.Select></div>
        <div className="col-md-1"><Form.Control type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /></div>
        <div className="col-md-1"><Form.Control type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></div>
        <div className="col-md-2"><Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Form.Select></div>
        <div className="col-md-2"><Button type="submit" variant="primary" className="w-100">Search</Button></div>
      </Form>
      {/* Hotel Cards */}
      {checkInDate && <p className="text-secondary">Showing hotels for <strong>{checkInDate}</strong></p>}
      {loading ? <div className="text-center"><Spinner animation="border" /></div> : hotels.length === 0 ? <p>No hotels found.</p> : <div className="row">{hotels.map((hotel) => (
        <div className="col-md-4 mb-4" key={hotel._id}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="text-primary">{hotel.name}</h5>
              <p><strong>{hotel.location}</strong></p>
              <p>Rating: {hotel.rating}⭐️</p>
              <p>Amenities: {hotel.amenities?.join(', ')}</p>
              <p>₹ {hotel.price}</p>
              <Button variant="primary" onClick={() => handleBookHotel(hotel)}>Book Now</Button>
            </Card.Body>
          </Card>
        </div>
      ))}</div>}
    </div>
  );
};

export default Hotels;
