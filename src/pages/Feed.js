// src/pages/Feed.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`https://flick-feeds-backend.onrender.com/like_post/${postId}`);
      setPosts(posts.map(post => post.PostID === postId ? {...post, Likes: post.Likes + 1} : post));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      await axios.post(`https://flick-feeds-backend.onrender.com/comment_on_post/${postId}`, {
        comment_text: commentText[postId]
      });
      setCommentText({ ...commentText, [postId]: '' });
      // Re-fetch posts or update state to reflect the new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-semibold text-red-500 mb-6">Social Feed</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.PostID} className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-200">{post.Review}</p>
            <span className="text-gray-400">Rating: {post.Rating}</span>
            <div className="mt-2">
              <button onClick={() => handleLike(post.PostID)} className="bg-red-500 px-2 py-1 rounded">Like {post.Likes}</button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText[post.PostID] || ''}
                onChange={(e) => setCommentText({ ...commentText, [post.PostID]: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              />
              <button onClick={() => handleAddComment(post.PostID)} className="mt-2 bg-gray-600 px-2 py-1 rounded">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
