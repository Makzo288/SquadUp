import React from 'react';
import ReactDOM from 'react-dom/client';
// import { SpeedInsights } from "@vercel/speed-insights/react"
import '../src/styles/main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// DISABLE_ESLINT_PLUGIN=true npm start