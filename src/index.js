import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import houseIcon from './static/house.jpeg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Dynamically set the favicon
const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/jpeg';  // Update the type to match the image type
link.rel = 'shortcut icon';
link.href = houseIcon;
document.getElementsByTagName('head')[0].appendChild(link);

reportWebVitals();
