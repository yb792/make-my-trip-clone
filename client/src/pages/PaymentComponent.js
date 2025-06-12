import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Card } from 'react-bootstrap';

function PaymentComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return <p className="text-center my-5">❌ Booking details not found.</p>;
  }

  const amount = bookingDetails.totalPrice?.toString() || '999.00';

  return (
    <div className="d-flex justify-content-center my-5">
      <Card style={{ maxWidth: '500px', width: '100%', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h3 className="text-center mb-4">Pay with PayPal</h3>

        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: amount },
              }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`✅ Payment completed by ${details.payer.name.given_name}`);
              console.log('Payment details:', details);

              // ✅ Redirect to payment success page
              navigate('/payment-success');
            });
          }}
          onCancel={() => {
            alert('❌ Payment cancelled.');
          }}
          onError={(err) => {
            console.error('PayPal Checkout Error:', err);
            alert('⚠️ Something went wrong during payment.');
          }}
        />
      </Card>
    </div>
  );
}

export default PaymentComponent;
