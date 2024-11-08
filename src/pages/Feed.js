import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Fetch all posts
        const postsResponse = await axios.get('http://127.0.0.1:5000/posts');
        setPosts(postsResponse.data.posts);

        // Fetch all users and map them by username for easy access
        const usersResponse = await axios.get('http://127.0.0.1:5000/users'); // Assuming this endpoint exists
        const usersData = usersResponse.data.users.reduce((acc, user) => {
          acc[user.Username] = user.ProfilePicture; // Map usernames to profile pictures
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPostsAndUsers();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:5000/like_post/${postId}`);
      setPosts(posts.map(post => post.PostID === postId ? { ...post, Likes: post.Likes + 1 } : post));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:5000/comment_on_post/${postId}`, {
        comment_text: commentText[postId]
      });
      setCommentText({ ...commentText, [postId]: '' });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Social Feed</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.PostID} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center p-4">
              <img
                src={users[post.Author] || "https://pxbar.com/wp-content/uploads/2023/08/girls-instagram-dp.jpg"}
                alt={post.Author || "User"}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-bold">{post.Author}</p>
                <p className="text-xs text-gray-400">Posted just now</p>
              </div>
            </div>
            <img
              src={post.ImagePath}
              alt={post.Review}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleLike(post.PostID)}
                  className="text-red-500 font-bold flex items-center mr-4"
                >
                  ❤️ Like {post.Likes}
                </button>
                <span className="text-gray-400 text-sm">Rating: {post.Rating}</span>
              </div>
              <p>
                <span className="font-bold">{post.Author}:</span> {post.Review}
              </p>
              <div className="mt-4">
                <h4 className="font-bold">Comments:</h4>
                {post.Comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-300">
                    <span className="font-bold">{comment.Username}:</span> {comment.CommentText}
                  </p>
                ))}
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[post.PostID] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [post.PostID]: e.target.value })}
                  className="flex-1 p-2 bg-gray-700 rounded mr-2"
                />
                <button
                  onClick={() => handleAddComment(post.PostID)}
                  className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
