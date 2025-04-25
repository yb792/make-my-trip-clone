import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Flights = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Local map of city => airport code
  const airportCodes = {
    Delhi: 'DEL',
    Mumbai: 'BOM',
    Bangalore: 'BLR',
    Hyderabad: 'HYD',
    Kolkata: 'CCU',
    Chennai: 'MAA',
    Goa: 'GOI',
    Jaipur: 'JAI',
    Lucknow: 'LKO',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.get('/api/flights/search', {
        params: { source: from, destination: to, departureDate: date, minPrice, maxPrice },
      });

      if (res.data.length === 0) {
        setError('No flights found.');
      } else {
        setFlights(res.data);
        setSuccess(`${res.data.length} flights found.`);
      }
    } catch (err) {
      console.error('Error fetching flights:', err);
      setError('Error fetching flights. Try again.');
    }
  };

  // ✅ Flight booking handler
  const handleBook = async (flight) => {
    try {
      const res = await axios.post('/api/bookings/flight', {
        flight: flight._id,
        seats: 1,
        totalPrice: flight.price,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Flight booked successfully!');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please login or try again.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-primary mb-4"><i className="bi bi-airplane-engines"></i> Search Flights</h2>
      <Form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <Form.Control
            placeholder="From (e.g., Delhi)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <Form.Control
            placeholder="To (e.g., Mumbai)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <Form.Control
            placeholder="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Form.Control
            placeholder="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-12 d-grid">
          <Button type="submit" variant="primary">🔍 Search Flights</Button>
        </div>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      <div className="mt-4">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight._id} className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="card-title text-info">
                  ✈️ {flight.airline} — {flight.from} ({airportCodes[flight.from] || 'N/A'}) ➡ {flight.to} ({airportCodes[flight.to] || 'N/A'})
                </h5>
                <p className="card-text">
                  🕓 Departure: {new Date(flight.departureDate).toDateString()} <br />
                  💸 Price: ₹{flight.price}
                </p>
                <Button variant="success" onClick={() => handleBook(flight)}>
                  Book Now
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No flights found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
