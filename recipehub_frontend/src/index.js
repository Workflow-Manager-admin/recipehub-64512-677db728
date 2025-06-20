import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// --- GOOGLE OAUTH PROVIDER INTEGRATION ---
// Install @react-oauth/google and jwt-decode:
//   npm install @react-oauth/google jwt-decode
//
// 1. Replace 'YOUR_GOOGLE_CLIENT_ID_HERE' with your actual client ID.
// 2. Wrap <App /> with <GoogleOAuthProvider ...> as below:

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
