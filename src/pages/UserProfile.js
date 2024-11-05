// src/pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`http://127.0.0.1:5000/profile/${username}`);
        setUser(userResponse.data);

        const postsResponse = await axios.get(`http://127.0.0.1:5000/get_user_posts/${userResponse.data.UserID}`);
        setUserPosts(postsResponse.data.posts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 text-white">
      <div className="flex items-center mb-6">
        <img src={user.ProfilePicture} alt={user.Username} className="w-20 h-20 rounded-full mr-4" />
        <div>
          <h1 className="text-2xl font-bold">{user.Username}</h1>
          <p className="text-gray-400">{user.Bio}</p>
          <button className="mt-2 bg-red-600 px-4 py-1 rounded">Follow</button>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-red-500 mb-4">Posts</h2>
      <div className="grid gap-6">
        {userPosts.map((post) => (
          <div key={post.PostID} className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-200">{post.Title}</p>
            <img src={post.ImagePath} alt={post.Title} className="w-full h-40 object-cover rounded mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
