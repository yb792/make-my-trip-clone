import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
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
    try {
      const details = await actions.order.capture();
      console.log('✅ Payment Successful:', details);

      // Save booking to DB
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Session expired. Please login again.');
        return navigate('/login');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/bookings/${bookingType}`,
        bookingDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Booking saved:', response.data);

      navigate('/payment-success', {
        state: {
          details,
          bookingDetails: {
            ...bookingDetails,
            type: bookingType,
          },
        },
      });
    } catch (error) {
      console.error('❌ Error during booking or payment:', error);
      if (error.response) {
        console.log('⚠️ Server responded with:', error.response.data);
        alert(`Booking failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.log('⚠️ No response received:', error.request);
        alert('Booking failed. No response from server.');
      } else {
        alert('Booking failed. Unknown error occurred.');
      }
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
          <>
            <p><strong>Converted to USD:</strong> ${usdAmount}</p>
            {conversionError && (
              <Alert variant="warning">⚠️ Using fallback conversion: 1 USD = ₹83</Alert>
            )}

            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: usdAmount?.toString(),
                        currency_code: 'USD',
                      },
                    },
                  ],
                });
              }}
              onApprove={handleApprove}
              onError={(err) => {
                console.error('❌ PayPal Error:', err);
                alert('Payment failed. Please try again.');
              }}
            />
          </>
        )}
      </Card>
    </Container>
  );
}

export default Payment;
