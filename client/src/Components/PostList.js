import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component is mounted
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://flickfeeds-602d4f3e68d7.herokuapp.com/posts');
        setPosts(response.data.posts); // Assuming the response has a 'posts' field with the data
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.PostID} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
