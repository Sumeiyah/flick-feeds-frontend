import React, { useState, useEffect } from "react";

function AvailableClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await fetch("https://flickfeeds-602d4f3e68d7.herokuapp.com/clubs");
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        
        const parsedClubs = await response.json();

        
        setClubs(parsedClubs);
      } catch (error) {
      
        setError(error);
      } finally {
      
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Available Clubs</h1>
      <ul type="list">
        {clubs.map((club) => (
          <li key={club.ClubID}>{club.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableClubs;
