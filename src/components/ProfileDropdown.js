import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  const dropdownRef = useRef();

  useEffect(() => {
    // Retrieve username from localStorage
    const username = localStorage.getItem('username');
    if (username) {
      // Fetch user profile from the backend
      fetch(`https://flick-feeds-backend.onrender.com/profile/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          return response.json();
        })
        .then((data) => {
          if (data.UserID) {
            setUser(data); // Store user data for display
          } else {
            console.error('User profile not found:', data.message);
          }
        })
        .catch((error) => console.error('Error fetching user profile:', error));
    } else {
      console.error('Username not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close dropdown on location change
    setIsOpen(false);
  }, [location]); // Runs whenever the location changes

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center"
        >
          ?
        </button>
        {isOpen && (
          <div className="absolute right-0 top-12 bg-gray-900 text-white w-64 h-auto rounded-lg shadow-lg z-10">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-lg font-semibold text-red-500">User Not Found</p>
              <p className="text-sm text-gray-400">The user does not exist.</p>
            </div>
            <div className="px-4 py-3">
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 px-4 py-2 w-full rounded text-white hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={user.ProfilePicture || 'https://via.placeholder.com/40'}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 top-12 bg-gray-900 text-white w-64 h-auto rounded-lg shadow-lg z-10">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-lg font-semibold">{user.Username}</p>
            <p className="text-sm text-gray-400">{user.Email}</p>
          </div>
          <ul className="py-2">
            <li>
              <Link to={`/profile/${user.Username}`} className="block px-4 py-2 hover:bg-gray-700">
                Your Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-600">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
