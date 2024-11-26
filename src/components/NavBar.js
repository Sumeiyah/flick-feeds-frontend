import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

function NavBar({ searchQuery, setSearchQuery, setIsGenreModalOpen }) {
  const location = useLocation();

  // Only render the search bar on the HomePage
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-50 text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* App Name */}
        <Link to="/" className="text-red-600 text-2xl font-bold">
          FLICKFEEDS
        </Link>

        {/* Navigation Links and Search Bar */}
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

          {/* Search Bar - Only visible on Home */}
          {location.pathname === "/" && (
            <div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-0 rounded-full px-4 py-1 flex items-center w-full max-w-md sm:max-w-xs md:max-w-sm lg:max-w-md"
              style={{ backdropFilter: "blur(8px)" }}
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
          )}

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>

      {/* Mobile Menu (Hidden on large screens) */}
      <div className="block sm:hidden bg-black bg-opacity-70 py-2 px-4">
        <div className="flex flex-col space-y-2">
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
      </div>
    </nav>
  );
}

export default NavBar;
