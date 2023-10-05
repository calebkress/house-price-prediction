import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';


function App() {
  return (
    // This router governs the high-level navigation of the app
    // Longterm we'll need links for the various segments we're implementing
    // It may make sense for some Routes to occur on the same page, e.g.
    // having the visualizations render once the user clicks "Calculate"
    <BrowserRouter>
      <div className="appDiv">
        <Routes>
          <Route path="/" element={<Home />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
