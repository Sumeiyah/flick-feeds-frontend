// src/pages/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToWatchlist = async () => {
    // API call to add to watchlist
    console.log("Add to watchlist");
  };

  const handleReviewSubmit = async () => {
    // Submit review API call
    console.log("Submit review:", review, rating);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 text-white">
      <img src={movie.ImagePath} alt={movie.Title} className="w-full h-96 object-cover mb-4" />
      <h1 className="text-3xl font-bold">{movie.Title}</h1>
      <p className="text-gray-400">{movie.Synopsis}</p>
      <button onClick={handleAddToWatchlist} className="mt-4 bg-red-600 px-4 py-2 rounded">Add to Watchlist</button>
      <div className="mt-6">
        <h2 className="text-xl">Leave a Review</h2>
        <input type="text" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review" className="w-full p-2 bg-gray-800 rounded mb-2"/>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} max="10" min="1" className="w-20 p-2 bg-gray-800 rounded mb-4" />
        <button onClick={handleReviewSubmit} className="bg-red-600 px-4 py-2 rounded">Submit Review</button>
      </div>
    </div>
  );
}

export default MovieDetail;
