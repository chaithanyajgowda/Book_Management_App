// src/components/Login.js
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import myImage from '../Images/book.jpg';
import '../styles/login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/users/login', form);
console.log("Login Response:", res.data);

    // 🔐 Store token & user
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    navigate('/home');
  } catch (err) {
    alert('Invalid credentials');
  }
};


  return (
     <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="row shadow-lg rounded bg-white" style={{ width: '800px' }}>
    {/* LEFT: Login Form */}
    <div className="col-md-6 p-4">
      <h3 className="text-center mb-4">
        Login to <span className="text-brown">Explore</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control custom-input"
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control custom-input"
            placeholder="Enter your password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="btn-brown w-100 mt-5 rounded-2 py-2">Login</button>
      </form>
      <div className="text-center mt-3">
        <small>
          Don't have an account?{" "}
          <a href="/register" className="text-brown">Create an account</a>
        </small>
      </div>
    </div>

    {/* RIGHT: Welcome Section */}
    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-peach p-4 rounded-end">
      <h4>
        Welcome to <span className="text-brown">StoryVerse</span>
      </h4>
      <p className="text-center">
        Explore endless articles, inspiring stories, and curated reads just for you.
      </p>
      <img
        src={myImage}
        alt="Reader"
        className="img-fluid"
        style={{ maxHeight: "300px" }}
      />
    </div>
  </div>
</div>

  );
}

export default Login;
