import React from 'react';

function PostDetailModal({ post, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">X</button>
        <h2 className="text-2xl font-bold mb-4">Review: {post.Review}</h2>
        <img src={post.ImagePath} alt={post.Review} className="w-full h-64 object-cover mb-4" />
        <p className="text-sm text-gray-400">Rating: {post.Rating}</p>
        <p className="text-sm text-gray-400">Likes: {post.Likes}</p>
        <p className="text-sm text-gray-400">Author: {post.Author}</p>

        <div className="mt-4">
          <h3 className="font-bold mb-2">Comments:</h3>
          {post.Comments.length > 0 ? (
            post.Comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm text-gray-300"><span className="font-bold">{comment.Username}:</span> {comment.CommentText}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetailModal;
