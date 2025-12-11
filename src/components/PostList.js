import React, { useState, useEffect } from 'react';
import PostDetailModal from './PostDetailModal';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get('https://flick-feeds-backend.onrender.com/posts')
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Social Feed</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map(post => (
          <div
            key={post.PostID}
            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
            onClick={() => handlePostClick(post)}
          >
            <img src={post.ImagePath} alt={post.Review} className="w-full h-64 object-cover rounded mb-4" />
            <p className="text-lg font-bold">{post.Review}</p>
            <p className="text-sm text-gray-400">Rating: {post.Rating}</p>
            <p className="text-xs text-gray-500">Likes: {post.Likes}</p>
            <p className="text-xs text-gray-500">Author: {post.Author}</p>
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default PostsList;
