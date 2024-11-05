// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { username } = useParams(); // Retrieve username from route params
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);

  useEffect(() => {
    // Fetch user profile details
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

    // Fetch watched movies for the user
    axios.get(`http://127.0.0.1:5000/watched_movies/${username}`)
      .then(response => setWatchedMovies(response.data.watched_movies))
      .catch(error => console.error("Error fetching watched movies:", error));

    // Fetch shared posts for the user
    axios.get(`http://127.0.0.1:5000/get_user_posts/${username}`)
      .then(response => setSharedPosts(response.data.posts))
      .catch(error => console.error("Error fetching shared posts:", error));
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 text-white">
      <div className="flex items-center justify-center mb-6">
        <img src={user.ProfilePicture || 'https://i.stack.imgur.com/34AD2.jpg'} alt={user.Username} className="w-28 h-28 rounded-full mr-6 border-4 border-gray-600" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.Username}</h1>
          <p className="text-gray-400 text-sm mb-4">{user.Bio || "Hey there! I'm a new Flick-Feeds user!"}</p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <span className="font-bold text-lg">{sharedPosts.length}</span>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div>
              <span className="font-bold text-lg">{followers}</span>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <span className="font-bold text-lg">{following}</span>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Watched Movies</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {watchedMovies.map(movie => (
            <div key={movie.MovieID} className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm">{movie.Title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Shared Posts</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {sharedPosts.map(post => (
            <div key={post.PostID} className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm">{post.Title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
