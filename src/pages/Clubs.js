import React, { useEffect, useState } from "react";
import axios from "axios";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [newClubName, setNewClubName] = useState("");
  const [newClubGenre, setNewClubGenre] = useState("");
  const [newClubDescription, setNewClubDescription] = useState("");
  const [newClubImage, setNewClubImage] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]); // Fix here
  const [createFilteredMovies, setCreateFilteredMovies] = useState([]);
  const [editFilteredMovies, setEditFilteredMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [editSelectedMovies, setEditSelectedMovies] = useState([]); // For Edit Club
  const [selectedClub, setSelectedClub] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const currentUser = localStorage.getItem("username");
  const [newClubImageURL, setNewClubImageURL] = useState(""); // For URL input
  const [editClubData, setEditClubData] = useState(null); // Stores data of the club being edited
  const [editClubId, setEditClubId] = useState(null); // Tracks the ID of the club being edited
  const [isEditing, setIsEditing] = useState(false); // Tracks if editing mode is active
  const [isCreateClubVisible, setIsCreateClubVisible] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Animation",
    "Romance",
    "Sci-Fi",
    "Crime",
    "Family",
    "Documentary",
  ];
  const handleEditGenreChange = async (newGenre) => {
    // If the genre hasn't changed, keep the current state of movies
    if (editClubData?.genre === newGenre) {
      return;
    }
  
    setEditClubData((prev) => ({ ...prev, genre: newGenre }));
    setEditFilteredMovies([]); // Clear the filtered movies initially
    setEditSelectedMovies([]); // Clear selected movies initially
  
    if (!newGenre) return;
  
    try {
      const response = await axios.get(
        `https://flick-feeds-backend.onrender.com/movies_by_genre/${newGenre}`
      );
      setEditFilteredMovies(response.data.movies || []); // Update the available movies
    } catch (error) {
      console.error("Error fetching movies by genre in edit form:", error);
    }
  };
  
  
  
  // Optionally remove unused variables if not needed
  // const [filteredMovies, setFilteredMovies] = useState([]);
  
  const handleViewMovie = (movieId) => {
    // Redirect to the movie page
    window.location.href = `/?movieId=${movieId}`;
  };

  // Fetch the list of clubs
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("https://flick-feeds-backend.onrender.com/clubs");
        setClubs(response.data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleEditClub = async (club) => {
    setEditClubId(club.ClubID);
    setEditClubData({
      ClubID: club.ClubID,
      club_name: club.Name,
      genre: club.Genre,
      description: club.Description,
      image_url: club.ImageURL,
    });
  
    // Populate selected movies
    setEditSelectedMovies(
      club.Movies.map((movie) => ({
        MovieID: movie.MovieID,
        Title: movie.Title,
      }))
    );
  
    try {
      // Fetch available movies for the genre
      const response = await axios.get(
        `https://flick-feeds-backend.onrender.com/movies_by_genre/${club.Genre}`
      );
  
      // Filter out already selected movies
      setEditFilteredMovies(
        response.data.movies.filter(
          (movie) =>
            !club.Movies.some((selectedMovie) => selectedMovie.MovieID === movie.MovieID)
        )
      );
    } catch (error) {
      console.error("Error fetching available movies for the genre:", error);
    }
  
    setIsEditing(true); // Set editing mode
  };
  
  const handleRemoveMember = async (clubId, userId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
  
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(
        `https://flick-feeds-backend.onrender.com/remove_member/${clubId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
  
      // Update the members in the modal dynamically
      setSelectedClub((prev) => ({
        ...prev,
        Members: prev.Members.filter((member) => member.UserID !== userId),
      }));
  
      // Optionally refresh the entire clubs list
      const updatedClubs = await axios.get(`https://flick-feeds-backend.onrender.com/clubs`);
      setClubs(updatedClubs.data.clubs);
    } catch (error) {
      console.error("Error removing member:", error);
      alert(error.response?.data?.message || "Failed to remove member.");
    }
  };
  
  

  const handleSaveEdit = async (clubId) => {
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
  
      // Append form data
      formData.append("club_name", editClubData.club_name);
      formData.append("genre", editClubData.genre);
      formData.append("description", editClubData.description);
      formData.append(
        "movies",
        JSON.stringify(editSelectedMovies.map((m) => m.MovieID))
      );
  
      // Handle image upload or URL
      if (editClubData.image) {
        formData.append("image", editClubData.image);
      } else if (editClubData.image_url) {
        formData.append("image_url", editClubData.image_url);
      }
  
      // Send PUT request
      const response = await axios.put(
        `https://flick-feeds-backend.onrender.com/edit_club/${clubId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert(response.data.message);
  
      // Refresh clubs after successful update
      const updatedClubs = await axios.get("https://flick-feeds-backend.onrender.com/clubs");
      setClubs(updatedClubs.data.clubs);
  
      // Reset edit state
      setEditClubId(null);
      setEditClubData(null);
    } catch (error) {
      console.error("Error saving club edits:", error);
      alert("Failed to save club edits. Please try again.");
    }
  };
  
  
  const handleGenreChange = async (genre) => {
    setNewClubGenre(genre);
    setCreateFilteredMovies([]);
    if (!genre) return;

    try {
      const response = await axios.get(
        `https://flick-feeds-backend.onrender.com/movies_by_genre/${genre}`
      );
      setCreateFilteredMovies(response.data.movies || []);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  // Remove added movie from the filtered list
  const handleAddMovie = (movie) => {
    if (!selectedMovies.find((m) => m.MovieID === movie.MovieID)) {
      setSelectedMovies([...selectedMovies, movie]);
  
      // Update the filtered movie lists to exclude the added movie
      setCreateFilteredMovies((prev) =>
        prev.filter((m) => m.MovieID !== movie.MovieID)
      );
      setEditFilteredMovies((prev) =>
        prev.filter((m) => m.MovieID !== movie.MovieID)
      );
    }
  };
  

  const handleRemoveMovie = (movieID) => {
    setSelectedMovies(
      selectedMovies.filter((movie) => movie.MovieID !== movieID)
    );
  };

  const handleEditAddMovie = (movie) => {
    if (!editSelectedMovies.find((m) => m.MovieID === movie.MovieID)) {
      setEditSelectedMovies([...editSelectedMovies, movie]);
      setEditFilteredMovies(
        editFilteredMovies.filter((m) => m.MovieID !== movie.MovieID)
      );
    }
  };
  const handleEditRemoveMovie = (movieID) => {
    setEditSelectedMovies(
      editSelectedMovies.filter((movie) => movie.MovieID !== movieID)
    );
  };
  

  const handleCreateClub = async () => {
    if (!newClubName || !newClubGenre) {
      setErrorMessages({ create: "Both Club Name and Genre are required!" });
      return;
    }
  
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
  
      formData.append("club_name", newClubName);
      formData.append("genre", newClubGenre);
      formData.append(
        "description",
        newClubDescription || `${newClubName} club for ${newClubGenre}`
      );
      if (newClubImage) {
        formData.append("image", newClubImage);
      } else if (newClubImageURL) {
        formData.append("image_url", newClubImageURL);
      }
      formData.append(
        "movies",
        JSON.stringify(selectedMovies.map((m) => m.MovieID))
      );
  
      const response = await axios.post(
        "https://flick-feeds-backend.onrender.com/create_club",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert(response.data.message || "Club created successfully!");
      setErrorMessages({});
      setNewClubName("");
      setNewClubGenre("");
      setNewClubDescription("");
      setNewClubImage(null);
      setNewClubImageURL("");
      setSelectedMovies([]);
      setCreateFilteredMovies([]);
  
      const updatedClubs = await axios.get("https://flick-feeds-backend.onrender.com/clubs");
      setClubs(updatedClubs.data.clubs);
    } catch (error) {
      console.error("Error creating club:", error.response?.data || error);
      setErrorMessages({
        create: error.response?.data?.message || "Failed to create club. Try again.",
      });
    }
  };
  
  

  const handleJoinClub = async (clubId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `https://flick-feeds-backend.onrender.com/join_club/${clubId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message || "Successfully joined the club!");
      const updatedClubs = await axios.get("https://flick-feeds-backend.onrender.com/clubs");
      setClubs(updatedClubs.data.clubs);
    } catch (error) {
      console.error("Error joining the club:", error);
      alert(error.response?.data?.message || "Failed to join the club.");
    }
  };

  const handleDeleteClub = async (clubId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(
        `https://flick-feeds-backend.onrender.com/delete_club/${clubId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message || "Club deleted successfully!");
      setClubs((prev) => prev.filter((club) => club.ClubID !== clubId));
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        [clubId]: error.response?.data?.message || "Failed to delete club.",
      }));
    }
  };

  return (
    <div className="container mx-auto py-16 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-red-500 mb-6 ">Movie Clubs</h1>

      {/* Create Club Section */}
      <div className="mb-6 bg-gray-900 p-4 rounded-lg shadow-lg max-w-xl mx-auto">
  <h2 className="text-2xl font-bold mb-4">Create a Club</h2>
  <div className="mb-4">
    <input
      type="text"
      placeholder="Club Name"
      value={newClubName}
      onChange={(e) => setNewClubName(e.target.value)}
      className="p-3 w-full bg-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 mb-2"
    />
    <select
      value={newClubGenre}
      onChange={(e) => handleGenreChange(e.target.value)}
      className="p-2 w-full bg-gray-700 rounded text-white focus:ring-2 focus:ring-red-500"
    >
      <option value="">Select Genre</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
         ))}
      </select>
      <textarea
    placeholder="Description (Optional)"
    value={newClubDescription}
    onChange={(e) => setNewClubDescription(e.target.value)}
    className="p-3 w-full bg-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 mt-2"
  /> 
    {createFilteredMovies.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-400">
          Select Movies for the Club
        </h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {createFilteredMovies.map((movie) => (
            <div
              key={movie.MovieID}
              className="flex items-center bg-gray-700 p-2 rounded"
            >
              <span className="text-white flex-grow">{movie.Title}</span>
              <button
                onClick={() => handleAddMovie(movie)}
                className="bg-red-600 px-2 py-1 text-sm rounded hover:bg-red-700"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
    {selectedMovies.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-400">Selected Movies:</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {selectedMovies.map((movie) => (
            <div
              key={movie.MovieID}
              className="flex items-center bg-gray-700 p-2 rounded"
            >
              <span className="text-white flex-grow">{movie.Title}</span>
              <button
                onClick={() => handleRemoveMovie(movie.MovieID)}
                className="bg-red-600 px-2 py-1 text-sm rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
    <label className="block mt-2 text-gray-400">Choose Image</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setNewClubImage(file); // Set the local image file
    }
  }}
  className="block w-full text-gray-400 mt-2"
/>
<label className="block mt-2 text-gray-400">Or Enter Image URL</label>
<input
  type="text"
  placeholder="Image URL (Optional)"
  value={newClubImageURL}
  onChange={(e) => setNewClubImageURL(e.target.value)}
  className="p-3 w-full bg-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 mt-2"
/>

  </div>
  <button
    onClick={handleCreateClub}
    className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
  >
    Create Club
  </button>
  {errorMessages.create && (
    <p className="text-red-500 mt-2">{errorMessages.create}</p>
  )}
</div>


      {/* Clubs List Section */}
      <h2 className="text-3xl font-bold text-center text-red-500 mb-4">Explore Clubs</h2>

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
{clubs.map((club) => (
    <div
      key={club.ClubID}
      className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition cursor-pointer"
      onClick={() => {
        if (!isEditing) setSelectedClub(club); // Only open the modal if not editing
      }}
    >
      {editClubId === club.ClubID ? (
        <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Edit Club</h2>
          <form>
            <input
              type="text"
              value={editClubData?.club_name || ""}
              onChange={(e) =>
                setEditClubData((prev) => ({
                  ...prev,
                  club_name: e.target.value,
                }))
              }
              placeholder="Club Name"
              className="p-3 w-full bg-gray-700 rounded text-white mb-3"
            />
            <textarea
              value={editClubData?.description || ""}
              onChange={(e) =>
                setEditClubData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
              className="p-3 w-full bg-gray-700 rounded text-white mb-3"
            ></textarea>
            <select
              value={editClubData?.genre || ""}
              onChange={(e) => handleEditGenreChange(e.target.value)}
              className="p-3 w-full bg-gray-700 rounded text-white mb-3"
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {editFilteredMovies.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-400">
                  Movies for this Genre
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {editFilteredMovies.map((movie) => (
                    <div
                      key={movie.MovieID}
                      className="flex items-center bg-gray-700 p-2 rounded"
                    >
                      <span className="text-white flex-grow">{movie.Title}</span>
                      <button
                        onClick={() => handleEditAddMovie(movie)}
                        className="bg-red-600 px-2 py-1 text-sm rounded hover:bg-red-700"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {editSelectedMovies.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-400">Selected Movies:</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {editSelectedMovies.map((movie) => (
                    <div
                      key={movie.MovieID}
                      className="flex items-center bg-gray-700 p-2 rounded"
                    >
                      <span className="text-white flex-grow">{movie.Title}</span>
                      <button
                        onClick={() => handleEditRemoveMovie(movie.MovieID)}
                        className="bg-red-600 px-2 py-1 text-sm rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <label className="block text-gray-400 mb-2">Choose Image</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    setEditClubData((prev) => ({
      ...prev,
      image: file, // Set the file
      image_url: "", // Clear the URL input
    }));
  }}
  className="block w-full text-gray-400 mb-3"
/>
<label className="block text-gray-400 mb-2">Or Enter Image URL</label>
<input
  type="text"
  value={editClubData?.image_url || ""}
  onChange={(e) =>
    setEditClubData((prev) => ({
      ...prev,
      image_url: e.target.value, // Set the URL
      image: null, // Clear the file input
    }))
  }
  placeholder="Image URL (Optional)"
  className="p-3 w-full bg-gray-700 rounded text-white mb-3"
/>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleSaveEdit(editClubData.ClubID);
                setIsEditing(false); // Exit editing mode

              }}
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditClubId(null);
                setEditClubData(null);
                setIsEditing(false); // Exit editing mode
                }}
              className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <>
          <img
            src={club.ImageURL || "default-image.jpg"}
            alt={club.Name}
            className="rounded-lg w-full h-40 object-cover mb-4"
          />
          <h2 className="text-xl font-bold">{club.Name}</h2>
          <p className="text-gray-400">Genre: {club.Genre}</p>
          <p className="text-gray-400">Owner: {club.OwnerUsername}</p>
          <p className="text-gray-400">Created At: {club.CreatedAt}</p>
          
          {currentUser === club.OwnerUsername ? (
            <>
              <div className="flex justify-between items-center space-x-4 mt-4">
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleEditClub(club);
    }}
    className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-blue-400 shadow-lg"
  >
    Edit Club
  </button>
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteClub(club.ClubID);
    }}
    className="bg-red-700 px-4 py-2 rounded text-white hover:bg-red-600 shadow-lg"
  >
    Delete Club
  </button>
</div>

            </>
          ) : (
            !club.IsMember && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoinClub(club.ClubID);
                }}
                className="mt-2 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
              >
                Join Club
              </button>
            )
          )}
        </>
      )}
    </div>
  ))}
</div>

{/* Modal for Detailed Club Information */}
{selectedClub && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setSelectedClub(null);
      }
    }}
  >
    <div className="bg-gray-900 p-6 rounded-lg w-96 relative">
      <button
        onClick={() => setSelectedClub(null)}
        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
      >
        X
      </button>
      <img
  src={selectedClub.ImageURL || "default-image.jpg"}
  alt={selectedClub.Name}
  className="rounded-lg w-full h-40 object-contain mb-4" // Changed from object-cover to object-contain
/>
      <h2 className="text-xl font-bold text-red-400">{selectedClub.Name}</h2>
      <p className="text-gray-400">Genre: {selectedClub.Genre}</p>
      <p className="text-gray-400">Owner: {selectedClub.OwnerUsername}</p>
      <p className="text-gray-400">Created At: {selectedClub.CreatedAt}</p>
      <div className="max-h-28 overflow-y-auto bg-gray-900 p-2 rounded mt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
    <p className="text-gray-400">Description: {selectedClub.Description}</p>
  </div>
      <h3 className="text-lg font-bold text-gray-400 mt-4">
        Movies ({selectedClub.Movies.length})
        </h3>
  <div className="max-h-20 overflow-y-auto bg-gray-900 p-2 rounded scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
    <ul>
    {selectedClub.Movies.map((movie) => (
      <li key={movie.MovieID}>
        <button
          onClick={() => handleViewMovie(movie.MovieID)}
          className="text-blue-500 underline"
        >
          {movie.Title}
        </button>
      </li>
    ))}
  </ul>
      </div>

      <h3 className="text-lg font-bold text-gray-400 mt-4">Members:({selectedClub.Members.length})</h3>
      <div className="max-h-10 overflow-y-auto bg-gray-900 p-2 rounded scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
        <ul>
{selectedClub.Members.map((member) => (
  <li key={member.UserID} className="flex justify-between items-center">
    <span>{member.Username}</span>
    {currentUser === selectedClub.OwnerUsername && member.Username !== selectedClub.OwnerUsername && (
      <button
        onClick={() => handleRemoveMember(selectedClub.ClubID, member.UserID)}
        className="text-red-500 underline hover:text-red-700"
      >
        Remove
      </button>
    )}
  </li>
))}

</ul>

    </div>
    </div>
    </div>

)}
</div>
);
}

export default Clubs;
