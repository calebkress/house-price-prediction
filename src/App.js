import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Navigation.css';
import Home from './Home';
import Description from './Description';
import Navigation from './Navigation';

function App() {
  return (
    <Router>
      <div className="appDiv">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/description" element={<Description />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
