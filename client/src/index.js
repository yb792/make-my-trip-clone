import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// ✅ Replace with your actual Sandbox Client ID (yours is correct)
const PAYPAL_CLIENT_ID = 'Ae-f-o8_p3Ozwq9QdvzPM0FZRilDb9nhzz9sJX-M9jFHQMEDeO1uj3939sx6luaxNhfjjV3FgNaMenUr';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "INR" }}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
