import React, { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [selectedPost, setSelectedPost] = useState(null); // Selected post for the comment modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [userProfiles, setUserProfiles] = useState({}); // To store profile pictures of commenters

  const currentUser = localStorage.getItem("username"); // Logged-in user

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:5000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const uniquePosts = Array.from(
        new Map(response.data.posts.map((post) => [post.PostID, post])).values()
      );
      setPosts(uniquePosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchUserProfile = async (username) => {
    if (userProfiles[username]) return; // Avoid fetching again if already fetched
    try {
      const response = await axios.get(`http://127.0.0.1:5000/profile/${username}`);
      setUserProfiles((prevProfiles) => ({
        ...prevProfiles,
        [username]: response.data.ProfilePicture,
      }));
    } catch (error) {
      console.error(`Error fetching profile for ${username}:`, error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Fetch profile pictures for all commenters
    posts.forEach((post) =>
      post.Comments.forEach((comment) => fetchUserProfile(comment.Username))
    );
  }, [posts]);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `http://127.0.0.1:5000/like_post/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(
        posts.map((post) =>
          post.PostID === postId ? { ...post, Likes: post.Likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      const token = localStorage.getItem("access_token");
      const newComment = commentText[postId];
      await axios.post(
        `http://127.0.0.1:5000/comment_on_post/${postId}`,
        { comment_text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.PostID === postId
            ? {
                ...post,
                Comments: [
                  ...post.Comments,
                  { Username: currentUser, CommentText: newComment },
                ],
              }
            : post
        )
      );
      setCommentText({ ...commentText, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleRate = (postId, rating) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.PostID === postId ? { ...post, UserRating: rating } : post
      )
    );
  };

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeCommentModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setSelectedPost(null);
      setIsModalOpen(false);
    }
  };

  const renderStars = (postId, currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRate(postId, i)} // Update the user's rating
          className={`cursor-pointer ${
            i <= currentRating ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Social Feed
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {posts.map((post) => (
          <div
            key={post.PostID}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-full max-w-md mx-auto relative"
          >
            <div className="p-4 flex justify-between items-center">
              {/* Actual Rating from Backend */}
              <div className="flex items-center">
                <span className="text-yellow-500 text-xl mr-2">★</span>
                <span className="text-sm text-white font-bold">
                  {post.Rating.toFixed(1)}
                </span>
              </div>
              <p className="font-bold">{post.Author}</p>
            </div>
            <img
              src={post.ImagePath}
              alt={post.Review}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleLike(post.PostID)}
                  className="text-red-500 font-bold flex items-center"
                >
                  ❤️ Like {post.Likes}
                </button>
                {/* User's Rating (Input) */}
                <div className="flex items-center">
                  {renderStars(post.PostID, post.UserRating || 0)}
                </div>
              </div>
              <p className="mb-4">
                <span className="font-bold">{post.Author}:</span> {post.Review}
              </p>
              <p className="text-sm mb-4">
                <span className="font-bold">Movie Title:</span> {post.MovieTitle}
              </p>
              <p className="text-sm mb-4">
                <span className="font-bold">Director:</span> {post.Director}
              </p>
              <p className="text-sm mb-4">
                <span className="font-bold">Genre:</span> {post.Genre}
              </p>
              <button
                onClick={() => openCommentModal(post)}
                className="text-blue-500 underline"
              >
                View all {post.Comments.length} comments
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Modal */}
      {isModalOpen && selectedPost && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
          onClick={closeCommentModal}
        >
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-h-[80%] overflow-y-auto relative">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {selectedPost.Comments.map((comment, index) => (
              <div key={index} className="mb-4 flex items-center">
                <img
                  src={userProfiles[comment.Username]}
                  alt={comment.Username}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <p>
                  <span className="font-bold">{comment.Username}:</span>{" "}
                  {comment.CommentText}
                </p>
              </div>
            ))}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText[selectedPost.PostID] || ""}
                onChange={(e) =>
                  setCommentText({
                    ...commentText,
                    [selectedPost.PostID]: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-700 rounded mb-2"
              />
              <button
                onClick={() => handleAddComment(selectedPost.PostID)}
                className="bg-blue-500 px-4 py-2 rounded text-white w-full"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
