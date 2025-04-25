import React from 'react';

function HotelCard({ hotel, onBook }) {
  return (
    <div style={styles.card}>
      <h3>{hotel.name}</h3>
      <p><strong>City:</strong> {hotel.city}</p>
      <p><strong>Available From:</strong> {new Date(hotel.availableFrom).toLocaleDateString()}</p>
      <p><strong>Available To:</strong> {new Date(hotel.availableTo).toLocaleDateString()}</p>
      <p><strong>Price Per Night:</strong> ₹{hotel.pricePerNight}</p>
      <button onClick={() => onBook(hotel)}>Book Now</button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '12px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

export default HotelCard;
