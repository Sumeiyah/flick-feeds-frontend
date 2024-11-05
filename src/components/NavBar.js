// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

function NavBar() {
  return (
    <nav className="bg-black px-4 py-3 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-red-600 text-2xl font-bold">Flick Feeds</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-red-500">Home</Link>
          <Link to="/feed" className="text-white hover:text-red-500">Posts</Link>
          <Link to="/clubs" className="text-white hover:text-red-500">Clubs</Link>
          <Link to="/users" className="text-white hover:text-red-500">Users</Link>
          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
