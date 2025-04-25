import React from 'react';
import BookingButton from './BookingButton';

const FlightSearchResult = ({ flight }) => {
  const seats = 1;
  const totalPrice = flight.price * seats;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{flight.airline}</h5>
        <p>From: {flight.source} → To: {flight.destination}</p>
        <p>Price: ₹{flight.price}</p>
        <BookingButton
          flight={flight}
          seats={seats}
          totalPrice={totalPrice}
          onSuccess={(data) => console.log('Booking successful', data)}
        />
      </div>
    </div>
  );
};

export default FlightSearchResult;
