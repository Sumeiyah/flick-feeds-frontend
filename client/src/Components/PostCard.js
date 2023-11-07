import React from 'react';
import './PostCard.css';

function PostCard({ post }) {
  return (
    <div className="post-card">
      {post.ImagePath && <img src={post.ImagePath} alt="Movie" className="post-image" />}
      <h3 className="post-title">{`Movie ID: ${post.MovieID}`}</h3>
      <p className="post-info">{`User ID: ${post.UserID}`}</p>
      <p className="post-info">{post.Review}</p>
      <p className="post-info">{`Rating: ${post.Rating}`}</p>
      <div className="comments">
        <h4 className="comments-title">Comments:</h4>
        {post.Comments.map((comment) => (
          <div key={comment.CommentID} className="comment">
            <p className="comment-text">{comment.CommentText}</p>
          </div>
        ))}
      </div>
      <div className="likes">
        <h4 className="likes-title">Likes:</h4>
        <p className="likes-count">{`Likes: ${post.Likes || 0}`}</p>
      </div>
    </div>
  );
}

export default PostCard;
