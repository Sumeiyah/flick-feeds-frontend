// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sidebar({ userId }) {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    // Fetch watched movies
    axios.get(`http://127.0.0.1:5000/watched_movies/${userId}`)
      .then(response => setWatchedMovies(response.data.watched_movies))
      .catch(error => console.error("Error fetching watched movies:", error));

    // Fetch shared posts
    axios.get(`http://127.0.0.1:5000/get_user_posts/${userId}`)
      .then(response => setSharedPosts(response.data.posts))
      .catch(error => console.error("Error fetching shared posts:", error));

    // Fetch followers count
    axios.get(`http://127.0.0.1:5000/followers/${userId}`)
      .then(response => setFollowers(response.data.followers_count))
      .catch(error => console.error("Error fetching followers count:", error));

    // Fetch following count
    axios.get(`http://127.0.0.1:5000/following/${userId}`)
      .then(response => setFollowing(response.data.following_count))
      .catch(error => console.error("Error fetching following count:", error));
  }, [userId]);

  return (
    <div className="bg-gray-900 p-4 text-white w-64 fixed h-full">
      <h2 className="text-xl font-semibold mb-4">Profile Sidebar</h2>
      <div>
        <h3 className="font-bold">Watched Movies</h3>
        <ul className="list-disc pl-5 mb-4">
          {watchedMovies.map(movie => (
            <li key={movie.MovieID}>{movie.Title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold">Shared Posts</h3>
        <ul className="list-disc pl-5 mb-4">
          {sharedPosts.map(post => (
            <li key={post.PostID}>{post.Title}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p><span className="font-bold">Followers:</span> {followers}</p>
        <p><span className="font-bold">Following:</span> {following}</p>
      </div>
    </div>
  );
}

export default Sidebar;
