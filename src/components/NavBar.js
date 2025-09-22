import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

function NavBar({ searchQuery, setSearchQuery, setIsGenreModalOpen }) {
  const location = useLocation();

  // Hide the navbar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 text-white">
      <div className="container mx-auto flex justify-between items-center px-2 py-3">
        {/* App Name */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-red-600 text-2xl font-bold">
            FLICKFEEDS
          </Link>

          {/* Search Bar - Different Styles for Large and Small Screens */}
          {location.pathname === "/" && (
            <>
              {/* Original Search Bar Style for Large Screens */}
              <div
                className="hidden lg:flex absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-20 rounded-full px-1  flex items-center w-full max-w-md"
                style={{ backdropFilter: "" }}
              >
                <button
                  onClick={() => setIsGenreModalOpen(true)}
                  className="text-gray-400 pr-4"
                >
                  🎚️ Filter
                </button>
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-transparent outline-none text-white placeholder-gray-400 flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="text-black text-xl">🔍</button>
              </div>

              {/* Smaller Search Bar Style for Medium and Small Screens */}
              <div
                className="lg:hidden flex items-center bg-black bg-opacity-70 rounded-full px-2 py-1"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <button
                  onClick={() => setIsGenreModalOpen(true)}
                  className="text-gray-400 pr-2"
                >
                  🎚️
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-white placeholder-gray-400 text-sm flex-grow w-16 sm:w-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="text-gray-400 pl-2">🔍</button>
              </div>
            </>
          )}
        </div>

        {/* Navigation Links and Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Links */}
          <div className="hidden sm:flex space-x-4">
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>
            <Link to="/feed" className="hover:text-red-500">
              Posts
            </Link>
            <Link to="/clubs" className="hover:text-red-500">
              Clubs
            </Link>
            <Link to="/users" className="hover:text-red-500">
              Users
            </Link>
          </div>

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
