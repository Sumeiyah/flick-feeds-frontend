// src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://flick-feeds-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert('Registered successfully!');

        // Store access token and username in localStorage
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
        }
        if (username) {
          localStorage.setItem('username', username);
        }

        navigate('/');
      } else {
        alert(data.message || 'An error occurred while registering.');
      }
    } catch (error) {
      alert('An error occurred while registering.');
      console.error('Register error:', error);
    }
  };

  return (
    <div style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1575919220112-0d5a2dc6a4b6?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: '#333',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.75)',
        padding: '40px',
        borderRadius: '10px',
        color: 'white',
        width: '350px',
        maxWidth: '90vw',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: 'white',
              color: '#333',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Sign Up
          </button>
          <div style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
