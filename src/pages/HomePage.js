// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/movies');
        setMovies(response.data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-semibold text-red-500 mb-6">Trending Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <div key={movie.MovieID} className="bg-gray-800 p-4 rounded-lg">
            <img src={movie.ImagePath || 'https://via.placeholder.com/150'} alt={movie.Title} className="w-full h-40 object-cover rounded-lg mb-3" />
            <h3 className="text-white font-semibold">{movie.Title}</h3>
            <p className="text-gray-400 text-sm">{movie.Genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
