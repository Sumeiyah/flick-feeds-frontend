import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('access_token');

    if (!username || !token) {
      console.warn("No token or username found. User must log in again.");
      return;
    }

    fetch(`https://flick-feeds-backend.onrender.com/profile/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => {
        if (data?.UserID) {
          setUser(data);
        } else {
          console.error("Profile fetch returned invalid structure:", data);
        }
      })
      .catch((err) => {
        console.error("ProfileDropdown error:", err);
        setUser(null);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
        >
          ?
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 bg-gray-900 text-white w-64 rounded-lg shadow-lg z-10">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-lg font-semibold text-red-500">Not Logged In</p>
              <p className="text-sm text-gray-400">Please log in again.</p>
            </div>
            <div className="px-4 py-3">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600"
              >
                Login
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
        src={user.ProfilePicture || "https://via.placeholder.com/40"}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 top-12 bg-gray-900 text-white w-64 rounded-lg shadow-lg z-10">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-lg font-semibold">{user.Username}</p>
            <p className="text-sm text-gray-400">{user.Email}</p>
          </div>
          <ul className="py-2">
            <li>
              <Link
                to={`/profile/${user.Username}`}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Your Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-red-600"
              >
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
