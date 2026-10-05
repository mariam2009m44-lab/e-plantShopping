import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <div className="landing_content">
          <h1>Welcome To Paradise Nursery</h1>
          <div className="divider"></div>
          <p>Where Green Meets Serenity</p>
          <button
            className="get-started-button"
            onClick={() => navigate('/plants')}
          >
            🌿 Get Started
          </button>
        </div>
        <div className="aboutus_container">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </div>
  );
}

export default App;