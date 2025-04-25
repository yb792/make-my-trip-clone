import React from 'react';
import axios from 'axios';

const BookingButton = ({ flight, seats, totalPrice, onSuccess }) => {
  const handleBooking = async () => {
    try {
      const response = await axios.post('/api/bookings', {
        flight: flight._id,
        seats,
        totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        onSuccess(response.data);
        alert('Booking Successful!');
      }
    } catch (error) {
      console.error('Error booking:', error);
      alert('Booking failed.');
    }
  };

  return <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>;
};

export default BookingButton;
