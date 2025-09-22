import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
function HomePage() {
  const [latestMovies, setLatestMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
    // eslint-disable-next-line
  const [searchParams] = useSearchParams();
  const [highlightedMovieId, setHighlightedMovieId] = useState(null);


  // Fetch movie data
  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const latestResponse = await axios.get(
          "https://api.kinocheck.com/trailers?language=en"
        );
        const latestData = Object.values(latestResponse.data || {}).filter(
          (movie) =>
            movie &&
            movie.youtube_thumbnail &&
            new Date(movie.published).getFullYear() >= 2024
        );
        setLatestMovies(latestData);
  
        const trendingResponse = await axios.get(
          "https://api.kinocheck.com/trailers/trending?language=en"
        );
        const trendingData = Object.values(trendingResponse.data || {}).filter(
          (movie) =>
            movie &&
            movie.youtube_thumbnail &&
            new Date(movie.published).getFullYear() >= 2000
        );
        setTrendingMovies(trendingData);
  
        const recommendedResponse = await axios.get(
          "http://127.0.0.1:5000/movies"
        );
        const moviesData = recommendedResponse.data.movies || [];
        const filteredMovies = moviesData.filter(
          (movie) =>
            movie.Title &&
            movie.Director &&
            movie.Genre &&
            movie.ImagePath &&
            movie.ReleaseYear &&
            movie.Synopsis &&
            movie.Trailer
        );
        setRecommendedMovies(filteredMovies);
  
        const allGenres = new Set();
        filteredMovies.forEach((movie) =>
          movie.Genre.split(",").forEach((genre) => allGenres.add(genre.trim()))
        );
        setGenres(Array.from(allGenres));
  
        // Fetch user info and watchlist
        const username = localStorage.getItem("username"); // Retrieve username
        if (!username) throw new Error("Username not found");
  
        const userResponse = await axios.get(
          `http://127.0.0.1:5000/profile/${username}`,
          {
            withCredentials: true,
          }
        );
        setWatchlist(userResponse.data.watchlist || []);
      } catch (error) {
        console.error("Error fetching movies or user data:", error);
      }
    };
  
    fetchMoviesData();
  }, []);
  
  useEffect(() => {
    const scrollToAndHighlightMovie = () => {
      const params = new URLSearchParams(window.location.search);
      const movieId = params.get("movieId");
      if (movieId) {
        const movieElement = document.getElementById(`movie-${movieId}`);
        if (movieElement) {
          // Scroll to the movie
          movieElement.scrollIntoView({ behavior: "smooth" });
  
          // Highlight the movie
          setHighlightedMovieId(movieId);
  
          // Remove the highlight after 3 seconds
          setTimeout(() => {
            setHighlightedMovieId(null);
          }, 3000); // Adjust the time if needed
        } else {
          console.warn(`Movie element with id "movie-${movieId}" not found.`);
        }
      }
    };
  
    if (recommendedMovies.length > 0) {
      scrollToAndHighlightMovie();
    }
  }, [recommendedMovies]);
  
  // Automatic rotation for latest movies
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        latestMovies.length > 0 ? (prevIndex + 1) % latestMovies.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [latestMovies]);

  // Handle genre filtering
  const toggleGenre = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
    setSearchQuery(""); // Clear search when filtering genres
  };

  // Close genre modal on outside click
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsGenreModalOpen(false);
      setSelectedMovie(null);
    }
  };

  const handleAddToWatchlist = async (movie) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You need to sign in to add movies to your watchlist.");
        return;
      }
  
      const response = await axios.post(
        "http://127.0.0.1:5000/add_watched_movie",
        { movie_id: movie.MovieID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 201) {
        // Update watchlist state
        setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
        alert("Movie added to your watchlist successfully!");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
  
        if (status === 409) {
          alert("This movie is already in your watchlist.");
        } else if (status === 404) {
          alert(error.response.data.message || "Movie or user not found.");
        } else if (status === 400) {
          alert("Invalid request. Please provide a valid movie ID.");
        } else {
          alert("Failed to add the movie. Please try again later.");
        }
      } else {
        console.error("Error adding movie to watchlist:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  


  // Filter recommended movies based on search and genre
  const filteredMovies = recommendedMovies.filter((movie) => {
    const matchesSearch =
      searchQuery === "" || movie.Title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.every((genre) => movie.Genre.includes(genre));
    return matchesSearch && matchesGenre;
  });

  const isSearchOrFilterActive = searchQuery || selectedGenres.length > 0;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <NavBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsGenreModalOpen={setIsGenreModalOpen}
      />
      {/* Latest Movies */}
{!isSearchOrFilterActive && (
  <section className="relative h-[80vh] mb-4"> {/* Adjusted height and spacing */}
    <AnimatePresence>
      {latestMovies.length > 0 && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 1, x: -400 }}
          animate={{ opacity: 2, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={latestMovies[currentIndex]?.youtube_thumbnail}
            alt={latestMovies[currentIndex]?.title || "No Title"}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Text and Button */}
          <div className="absolute top-1/4 left-10 text-white max-w-lg">
            <h2 className="text-3xl font-bold uppercase mb-2 drop-shadow-lg">
              Latest Movies
            </h2>
            <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
              {latestMovies[currentIndex]?.title || "No Title"}
            </h1>
            <a
              href={`https://www.youtube.com/watch?v=${latestMovies[currentIndex]?.youtube_video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-2 text-lg rounded-lg shadow-md hover:bg-gray-200"
            >
              Watch Trailer
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Navigation Buttons */}
    <button
      onClick={() =>
        setCurrentIndex((prev) => (prev - 1 + latestMovies.length) % latestMovies.length)
      }
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
    >
      ◀
    </button>
    <button
      onClick={() => setCurrentIndex((prev) => (prev + 1) % latestMovies.length)}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
    >
      ▶
    </button>
  </section>
)}

{/* Trending Movies */}
{!isSearchOrFilterActive && (
  <section className="relative py-0">
    <h2 className="text-3xl font-bold text-red-500 mb-6 px-4 flex items-center justify-center">
      🔥 Trending Movies
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {trendingMovies.map((movie) => (
        <div
          key={movie.youtube_video_id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
        >
          <img
            src={movie.youtube_thumbnail}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl truncate">{movie.title}</h3>
            <a
              href={`https://www.youtube.com/watch?v=${movie.youtube_video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline mt-2 block"
            >
              Watch Trailer
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

  
      {/* Recommended Movies */}
<section className="py-8">
  <h2 className="text-3xl font-bold text-red-500 mb-6 px-4 flex items-center justify-center">
    All Movies
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
  {filteredMovies.map((movie) => (
  <div
    key={movie.MovieID}
    id={`movie-${movie.MovieID}`}
    className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition cursor-pointer ${
      highlightedMovieId === movie.MovieID ? "border-4 border-red-500" : ""
    }`}
    onClick={() => {
      console.log("Selected movie:", movie); // Debug log
      setSelectedMovie(movie);
    }}
  >
    {highlightedMovieId === movie.MovieID &&
      console.log(`Highlighting movie: ${movie.Title}, ID: ${movie.MovieID}`)} {/* Log matching movie */}
    <img
      src={movie.ImagePath}
      alt={movie.Title}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold text-xl truncate">{movie.Title}</h3>
      <p className="text-sm text-gray-400">{movie.Genre}</p>
      <div className="flex justify-between items-center mt-4">
        <a
          href={movie.Trailer}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          Watch Trailer
        </a>
        <button
          className="text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWatchlist(movie);
          }}
        >
          {watchlist.some((wm) => wm.MovieID === movie.MovieID) ? "✔" : "+"}
        </button>
      </div>
    </div>
  </div>
))}

  </div>
</section>

      
      {/* Genre Modal */}
      {isGenreModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-gray-900 p-6 rounded-lg max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Select Genres</h2>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-full ${
                    selectedGenres.includes(genre)
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Movie Modal */}
      {selectedMovie && (
  <div
    id="modal-overlay"
    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    onClick={handleOutsideClick}
  >
    <div
      className="bg-gray-900 rounded-lg overflow-hidden w-10/12 sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-center relative"
      style={{
        maxHeight: "80vh", // Limits the height of the modal
        transform: "translateY(-10%)", // Slightly moves the modal up
      }}
    >
      <img
        src={selectedMovie.ImagePath}
        alt={selectedMovie.Title}
        className="max-w-full max-h-64" // Adjusts image size for a slimmer appearance
        style={{ objectFit: "contain" }} // Keeps the aspect ratio intact
      />
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">{selectedMovie.Title}</h2>
        <p className="text-sm text-gray-400 mb-2">
          Director: {selectedMovie.Director}
        </p>
        <p className="text-sm text-gray-400 mb-2">
          Genre: {selectedMovie.Genre}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Release Year: {selectedMovie.ReleaseYear}
        </p>
        <p className="text-sm text-gray-200">{selectedMovie.Synopsis}</p>
      </div>
      <button
        onClick={() => setSelectedMovie(null)}
        className="absolute top-2 right-2 text-gray-200 text-xl"
      >
        &times;
      </button>
    </div>
  </div>
)}


    </div>
  );
}

export default HomePage;
