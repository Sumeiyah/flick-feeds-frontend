// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1 className="brand">Movie Club</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;
