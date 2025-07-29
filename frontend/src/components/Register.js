// src/components/Register.js
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import myImage from '../Images/book.jpg';
import '../styles/register.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/register', form);
      navigate('/');
    } catch (err) {
      alert("Registration failed");
    }
  };

   return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row shadow-lg rounded bg-white" style={{ width: '800px' }}>
        <div className="col-md-6 p-4">
          <h3 className="text-center mb-4">Create <span className="text-warning">Account</span></h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Username</label>
              <input type="text" className="form-control custom-input" placeholder="Username"
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
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
            
            <button className="btn-brown w-100 mt-5 rounded-2 py-2">Signup</button>
          </form>
          <div className="text-center mt-3">
            <a href="/" className="text-brown">Back to login</a>
          </div>
        </div>
       <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-peach p-4 rounded-end">
          <h4>Join <span className="text-warning">StoryVerse</span></h4>
          <p className="text-center">Create your account to explore inspiring articles and stories.</p>
          <img src={myImage} alt="Reader" className="img-fluid" style={{ maxHeight: '300px' }} />
        </div>
      </div>
    </div>
  );
}

export default Register;
