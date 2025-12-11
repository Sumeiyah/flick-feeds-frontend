// src/components/SharedPostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SharedPostDetail() {
  const { postId } = useParams(); // Assumes postId is in the route params
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`https://flick-feeds-backend.onrender.com/share_post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <div className="shared-post-detail container mx-auto text-white py-8">
      <div className="flex items-center mb-4">
        <img src={post.Author.ProfilePicture || 'https://via.placeholder.com/40'} alt="Author" className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-bold">{post.Author.Username}</h3>
        </div>
      </div>
      <img src={post.ImagePath} alt="Post" className="w-full h-64 object-cover mb-4 rounded-lg" />
      <p className="text-lg">{post.Review}</p>
      <p className="text-gray-400">Rating: {post.Rating}</p>

      {post.Movie && (
        <div className="movie-details mt-6">
          <h4 className="text-2xl font-bold">{post.Movie.Title}</h4>
          <p>{post.Movie.Genre} | Directed by: {post.Movie.Director} | {post.Movie.ReleaseYear}</p>
          <p className="text-gray-400 mt-2">{post.Movie.Synopsis}</p>
        </div>
      )}

      <div className="comments mt-8">
        <h4 className="text-xl font-semibold mb-4">Comments</h4>
        {post.Comments.length > 0 ? (
          post.Comments.map((comment) => (
            <div key={comment.CommentID} className="comment mb-3">
              <p className="font-semibold">{comment.Commenter.Username}</p>
              <p className="text-gray-300">{comment.CommentText}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <div className="likes mt-6">
        <h4 className="text-xl font-semibold">Likes</h4>
        {post.Likes.length > 0 ? (
          post.Likes.map((like) => (
            <span key={like.LikeID} className="mr-2 text-blue-400">{like.Liker.Username}</span>
          ))
        ) : (
          <p>No likes yet.</p>
        )}
      </div>
    </div>
  );
}

export default SharedPostDetail;
