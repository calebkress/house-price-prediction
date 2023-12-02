import React from 'react';
import { Link } from 'react-router-dom';
import './App.js';
import './Navigation.css'; 
import './Description.js';
import './Visualizations.js';

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/visualizations" className="nav-link">
            Visualizations
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/description" className="nav-link">
            Description
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
