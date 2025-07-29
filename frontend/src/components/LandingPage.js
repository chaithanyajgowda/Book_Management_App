// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css'; // create this CSS file

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page d-flex justify-content-center align-items-center vh-100 text-center text-white">
      <div>
        <h1 className="display-4 mb-4 text-black">Welcome to <span className="text-warning">StoryVerse</span></h1>
        <p className="lead mb-4">Discover inspiring books and manage your library seamlessly.</p>
        <button className="btn btn-warning btn-lg px-5" onClick={() => navigate('/book')}>
          Explore
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
