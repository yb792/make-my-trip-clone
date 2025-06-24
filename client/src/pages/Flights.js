import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const params = { source, destination, departureDate, minPrice, maxPrice, sortBy };
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/flights/search`, { params });
      setFlights(Array.isArray(data) ? data : data.flights || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleBookFlight = (flight) => {
    const bookingDetails = {
      type: 'flight',
      flight: flight._id,
      totalPrice: flight.price,
      price: flight.price,
    };
    navigate('/payment', { state: { bookingDetails, type: 'flight' } });
  };

  return (
    <div className="container my-4">
      <h2 className="text-primary mb-4">✈️ Search Flights</h2>
      <Form onSubmit={(e) => { e.preventDefault(); fetchFlights(); }} className="row g-3 mb-4">
        {/* Filter Inputs */}
        <div className="col-md-3"><Form.Control type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} /></div>
        <div className="col-md-3"><Form.Control type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} /></div>
        <div className="col-md-3"><Form.Control type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} /></div>
        <div className="col-md-2"><Form.Control type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /></div>
        <div className="col-md-2"><Form.Control type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></div>
        <div className="col-md-2"><Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Form.Select></div>
        <div className="col-md-2"><Button type="submit" variant="primary" className="w-100">Search</Button></div>
      </Form>
      {/* Flight Cards */}
      {loading ? <div className="text-center"><Spinner animation="border" /></div> : flights.length === 0 ? <p>No flights found.</p> : <div className="row">{flights.map((flight) => (
        <div className="col-md-4 mb-4" key={flight._id}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="text-primary">{flight.airline}</h5>
              <p><strong>{flight.from} → {flight.to}</strong></p>
              <p>Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
              <p>₹ {flight.price}</p>
              <Button variant="primary" onClick={() => handleBookFlight(flight)}>Book Now</Button>
            </Card.Body>
          </Card>
        </div>
      ))}</div>}
    </div>
  );
};

export default Flights;

