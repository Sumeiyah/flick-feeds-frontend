// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [showSection, setShowSection] = useState('watchedMovies'); // Default section

  useEffect(() => {
    // Fetch user details
    axios.get(`http://127.0.0.1:5000/profile/${username}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data:", error));

    // Fetch followers and following count
    axios.get(`http://127.0.0.1:5000/followers/${username}`)
      .then(response => setFollowers(response.data.followers_count))
      .catch(error => console.error("Error fetching followers:", error));
      
    axios.get(`http://127.0.0.1:5000/following/${username}`)
      .then(response => setFollowing(response.data.following_count))
      .catch(error => console.error("Error fetching following:", error));

    // Fetch watched movies
    axios.get(`http://127.0.0.1:5000/watched_movies/${username}`)
      .then(response => setWatchedMovies(response.data.watched_movies))
      .catch(error => console.error("Error fetching watched movies:", error));

    // Fetch shared posts
    axios.get(`http://127.0.0.1:5000/get_user_posts/${username}`)
      .then(response => setSharedPosts(response.data.posts))
      .catch(error => console.error("Error fetching shared posts:", error));
  }, [username]);

  const handleSectionChange = (section) => {
    setShowSection(section);
  };

  const handleUpdateProfile = () => {
    // Redirect to update profile page or open an update modal
    window.location.href = `/update_profile/${user.UserID}`;
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 text-white">
      <div className="flex items-center mb-6">
        <img src={user.ProfilePicture || 'https://via.placeholder.com/40'} alt={user.Username} className="w-20 h-20 rounded-full mr-4" />
        <div>
          <h1 className="text-2xl font-bold">{user.Username}</h1>
          <p className="text-gray-400">{user.Bio}</p>
          <p className="text-gray-400">{user.Email}</p>
          <p className="text-sm text-gray-500 mt-2">Followers: {followers} | Following: {following}</p>
          <button onClick={handleUpdateProfile} className="bg-blue-500 px-4 py-2 rounded text-white mt-4">Edit Profile</button>
        </div>
      </div>

      <div className="flex justify-around border-t border-gray-700 pt-4">
        <button className={`text-lg font-semibold ${showSection === 'watchedMovies' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleSectionChange('watchedMovies')}>
          Watched Movies
        </button>
        <button className={`text-lg font-semibold ${showSection === 'sharedPosts' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleSectionChange('sharedPosts')}>
          Shared Posts
        </button>
      </div>

      {showSection === 'watchedMovies' && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {watchedMovies.map(movie => (
            <div key={movie.MovieID} className="p-4 bg-gray-800 rounded-lg">
              <p className="text-center">{movie.Title}</p>
            </div>
          ))}
        </div>
      )}

      {showSection === 'sharedPosts' && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {sharedPosts.map(post => (
            <div key={post.PostID} className="p-4 bg-gray-800 rounded-lg">
              <p className="text-center">{post.Title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
