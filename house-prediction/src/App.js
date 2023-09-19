import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './Home';


function App() {
  return (
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
