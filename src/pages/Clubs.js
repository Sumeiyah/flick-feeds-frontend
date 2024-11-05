// src/pages/Clubs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/clubs');
        setClubs(response.data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-semibold text-red-500 mb-6">Movie Clubs</h1>
      <div className="grid gap-6">
        {clubs.map((club) => (
          <div key={club.ClubID} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{club.Name}</h2>
            <p className="text-gray-400">Genre: {club.Genre}</p>
            <button className="mt-2 bg-red-600 px-4 py-1 rounded">Join Club</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clubs;
