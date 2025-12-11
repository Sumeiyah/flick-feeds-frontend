import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`https://flick-feeds-backend.onrender.com/search_users?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuggestions(response.data.users);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setErrorMessage('Failed to fetch suggestions. Try again.');
    }
  };

  const handleNavigateToProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://i.ibb.co/qsjdtkf/cinematic-background.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        filter: 'brightness(0.9)',
      }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen flex flex-col items-center pt-24 py-16">
        <h1 className="text-4xl font-bold text-red-500 mb-8">Search Users</h1>
        <div className="mb-4 relative w-full sm:w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username..."
            className="p-3 w-full bg-gray-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {suggestions.length > 0 && (
            <div className="absolute bg-gray-900 w-full rounded mt-2 shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((user) => (
                <div
                  key={user.UserID}
                  onClick={() => handleNavigateToProfile(user.Username)}
                  className="p-3 flex items-center hover:bg-gray-800 cursor-pointer"
                >
                  <img
                    src={user.ProfilePicture || 'https://via.placeholder.com/40'}
                    alt={user.Username}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{user.Username}</p>
                    <p className="text-xs text-gray-400">
                      {user.is_following ? 'Following' : `${user.followers_count} Followers`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default UserSearch;
