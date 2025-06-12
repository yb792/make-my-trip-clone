// src/pages/Payment.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;
  const bookingType = location.state?.type; // "flight" or "hotel"

  const [usdAmount, setUsdAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversionError, setConversionError] = useState(false);

  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  // Convert INR to USD
  useEffect(() => {
    const convertINRtoUSD = async () => {
      try {
        const fallbackRate = 83;
        const converted = (bookingDetails.totalPrice / fallbackRate).toFixed(2);
        setUsdAmount(converted);
        setLoading(false);
      } catch (error) {
        console.error('❌ Currency conversion failed:', error);
        setConversionError(true);
        setUsdAmount((bookingDetails.totalPrice / 83).toFixed(2));
        setLoading(false);
      }
    };

    if (bookingDetails?.totalPrice) {
      convertINRtoUSD();
    } else {
      setLoading(false);
    }
  }, [bookingDetails]);

  if (!bookingDetails) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">❌ Booking details not found.</Alert>
      </Container>
    );
  }

  const handleApprove = async (data, actions) => {
    const details = await actions.order.capture();
    console.log('✅ Payment Successful:', details);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/bookings/${bookingType}`,
        bookingDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('✅ Booking saved:', response.data);
      navigate('/payment-success');
    } catch (error) {
      console.error('❌ Booking API error:', error);
      alert('Booking failed after payment.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
      <Card className="shadow p-5 text-center" style={{ minWidth: '350px' }}>
        <h3 className="mb-4">Pay with PayPal</h3>
        <p><strong>Amount (INR):</strong> ₹{bookingDetails.totalPrice}</p>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD' }}>
            <>
              <p><strong>Converted to USD:</strong> ${usdAmount}</p>
              {conversionError && (
                <Alert variant="warning">⚠️ Using fallback rate 1 USD ≈ ₹83.</Alert>
              )}
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: usdAmount,
                      },
                    }],
                  });
                }}
                onApprove={handleApprove}
                onError={(err) => {
                  console.error('❌ PayPal Error:', err);
                  alert('Payment failed. Please try again.');
                }}
              />
            </>
          </PayPalScriptProvider>
        )}
      </Card>
    </Container>
  );
}

export default Payment;
