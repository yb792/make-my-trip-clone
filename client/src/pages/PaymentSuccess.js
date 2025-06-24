import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function PaymentSuccess() {
  const location = useLocation();
  const { details, bookingDetails } = location.state || {};

  return (
    <Container className="mt-5 text-center">
      <Alert variant="success">
        <Alert.Heading>✅ Payment Successful!</Alert.Heading>
        <p>
          Thank you, <strong>{details?.payer?.name?.given_name || 'User'}</strong>!
        </p>
        <p>
          Booking Type: <strong>{bookingDetails?.type || 'N/A'}</strong> <br />
          Total Paid: <strong>₹{bookingDetails?.totalPrice || '0'}</strong>
        </p>
        <hr />
        <Button as={Link} to="/user-bookings" variant="primary">
          View My Bookings
        </Button>
      </Alert>
    </Container>
  );
}

export default PaymentSuccess;
