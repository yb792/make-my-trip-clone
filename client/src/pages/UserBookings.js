// ✅ Updated UserBookings.js for full flight + hotel cancel support
import axios from 'axios';
import { useEffect, useState } from 'react';

const cityMap = {
  DEL: 'Delhi',
  BOM: 'Mumbai',
  BLR: 'Bangalore',
  HYD: 'Hyderabad',
  PNQ: 'Pune',
  MAA: 'Chennai',
  CCU: 'Kolkata',
  GOI: 'Goa',
  JAI: 'Jaipur',
  LKO: 'Lucknow',
};

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, [API_BASE, token]);

  const cancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.delete(`${API_BASE}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">🧾 Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-muted">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="card shadow-sm mb-4 border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">
                {booking.type === 'flight' ? (
                  <>
                    ✈️ <strong>{booking.flight?.airline}</strong> —{' '}
                    <span className="text-primary">
                      {cityMap[booking.flight?.fromCode] || booking.flight?.from} ({booking.flight?.fromCode})
                    </span>{' '}
                    ➡{' '}
                    <span className="text-success">
                      {cityMap[booking.flight?.toCode] || booking.flight?.to} ({booking.flight?.toCode})
                    </span>
                  </>
                ) : (
                  <>
                    🏨 <strong>{booking.hotel?.name}</strong> —{' '}
                    <span className="text-primary">{booking.hotel?.location}</span>
                  </>
                )}
              </h5>
              <ul className="list-unstyled mb-3">
                <li><strong>Booking ID:</strong> {booking._id}</li>
                <li><strong>Price:</strong> ₹{booking.totalPrice}</li>
                <li><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleString()}</li>
              </ul>
              <div className="text-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookings;
