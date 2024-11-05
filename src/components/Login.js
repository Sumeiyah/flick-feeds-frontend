// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const backgroundImageUrl = 'https://images.unsplash.com/photo-1575919220112-0d5a2dc6a4b6?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login Successful!');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('username', data.username);

        window.location.href = '/';
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert('An error occurred during login.');
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImageUrl})`,
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
      overflow: 'hidden',
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.75)',
        padding: '40px',
        borderRadius: '10px',
        color: 'white',
        width: '350px',
        maxWidth: '90vw',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
          <div style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
