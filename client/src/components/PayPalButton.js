import React, { useEffect, useRef } from 'react';

function PayPalButton({ amount = 1000, onSuccess }) {
  const paypalRef = useRef();

  useEffect(() => {
    // Ensure PayPal script is loaded
    if (!window.paypal) {
      console.error("PayPal SDK not loaded");
      return;
    }

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toString(), // 💰 Price in string format
              currency_code: "INR"
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          console.log('✅ Payment Approved:', details);
          if (onSuccess) onSuccess(details);
        });
      },
      onError: (err) => {
        console.error('❌ PayPal Checkout Error:', err);
        alert("Payment failed. Please try again.");
      }
    }).render(paypalRef.current);
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
}

export default PayPalButton;
