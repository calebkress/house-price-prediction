import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Navigation from './Navigation';



function App() {
  return (
    // This router governs the high-level navigation of the app
    // Longterm we'll need links for the various segments we're implementing
    // It may make sense for some Routes to occur on the same page, e.g.
    // having the visualizations render once the user clicks "Calculate"
        <Router>
          <div className="appDiv">
            <Navigation />
    
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      );
    }
    
    export default App;