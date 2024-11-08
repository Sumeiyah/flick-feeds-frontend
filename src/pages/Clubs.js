import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [newClubName, setNewClubName] = useState('');
  const [newClubGenre, setNewClubGenre] = useState('');
  const [newClubDescription, setNewClubDescription] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const currentUser = localStorage.getItem('username');

  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/clubs');
        setClubs(response.data.clubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    fetchClubs();
  }, []);

  const handleCreateClub = async () => {
    if (!newClubName || !newClubGenre) {
      setErrorMessages({ create: 'Both Club Name and Genre are required!' });
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://127.0.0.1:5000/create_club',
        {
          club_name: newClubName,
          genre: newClubGenre,
          description: newClubDescription || `${newClubName} club for ${newClubGenre}`,
          owner_id: localStorage.getItem('user_id'),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || 'Club created successfully!'); // Browser popup for success

      setErrorMessages({});
      setNewClubName('');
      setNewClubGenre('');
      setNewClubDescription('');

      const updatedClubs = await axios.get('http://127.0.0.1:5000/clubs');
      setClubs(updatedClubs.data.clubs);
    } catch (error) {
      setErrorMessages({ create: 'Failed to create club. Try again.' });
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `http://127.0.0.1:5000/join_club/${clubId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message || 'Successfully joined the club!'); // Browser popup for success

      setErrorMessages((prev) => ({ ...prev, [clubId]: '' }));

      const updatedClubs = await axios.get('http://127.0.0.1:5000/clubs');
      setClubs(updatedClubs.data.clubs);
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        [clubId]: error.response?.data?.message || 'Failed to join club.',
      }));
    }
  };

  const handleDeleteClub = async (clubId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(
        `http://127.0.0.1:5000/delete_club/${clubId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message || 'Club deleted successfully!'); // Browser popup for success

      setClubs((prev) => prev.filter((club) => club.ClubID !== clubId));
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        [clubId]: error.response?.data?.message || 'Failed to delete club.',
      }));
    }
  };

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-semibold text-red-500 mb-6">Movie Clubs</h1>

      {/* Create Club Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg shadow-lg">
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
            onChange={(e) => setNewClubGenre(e.target.value)}
            className="p-3 w-full bg-gray-700 rounded text-white focus:ring-2 focus:ring-red-500"
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
        </div>
        <button
          onClick={handleCreateClub}
          className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
        >
          Create Club
        </button>
        {errorMessages.create && <p className="text-red-500 mt-2">{errorMessages.create}</p>}
      </div>

      {/* Clubs List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div key={club.ClubID} className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-red-400">{club.Name}</h2>
            <p className="text-gray-400">Genre: {club.Genre}</p>
            <p className="text-gray-400">Owner: {club.OwnerUsername || 'Unknown'}</p>
            <p className="text-gray-400">Members: {club.Members.length || 0}</p>
            <p className="text-gray-400">Description: {club.Description}</p>

            <div className="mt-2">
              <strong>Members:</strong>
              <ul className="list-disc list-inside text-gray-400">
                {club.Members.map((member) => (
                  <li key={member.UserID}>{member.Username}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleJoinClub(club.ClubID)}
              className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Join Club
            </button>

            {currentUser === club.OwnerUsername && (
              <button
                onClick={() => handleDeleteClub(club.ClubID)}
                className="mt-2 ml-2 bg-gray-700 px-4 py-2 rounded hover:bg-red-500"
              >
                Delete Club
              </button>
            )}

            {errorMessages[club.ClubID] && (
              <p className="text-red-500 mt-2">{errorMessages[club.ClubID]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clubs;
