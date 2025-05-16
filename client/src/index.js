import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/main.css';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);


// DISABLE_ESLINT_PLUGIN=true npm start