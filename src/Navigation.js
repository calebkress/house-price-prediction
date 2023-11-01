import React from 'react';
import { Link } from 'react-router-dom';
import './App.js';
import './Navigation.css'; 
import './Description.js';

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
          <Link to="/visuals" className="nav-link">
            Visuals
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
