import React, { useState, useEffect } from 'react';

function ClubList() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Step 1: Fetch the list of clubs from the /clubs endpoint
    fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/clubs')
      .then(response => response.json())
      .then(clubsData => {
        // Step 2: Fetch usernames for each club member
        const clubPromises = clubsData.clubs.map(club => {
          return fetch(`https://flickfeeds-602d4f3e68d7.herokuapp.com/profile/${club.OwnerID}`)
            .then(response => response.json())
            .then(userData => {
              return { ...club, OwnerName: userData.Username }; // Combine club data with owner's username
            });
        });

        // Step 3: Combine the club data with usernames and set the state
        Promise.all(clubPromises).then(clubsWithNames => {
          setClubs(clubsWithNames);
        });
      })
      .catch(error => console.error('Error fetching clubs:', error));
  }, []);

  return (
    <div>
      <h2>Available Clubs</h2>
      <ul>
        {clubs.map((club, index) => (
          <li key={club.ClubID}>
            <h3>{club.Name}</h3>
            <p>Genre: {club.Genre}</p>
            <p>Owner: {club.OwnerName}</p> {/* Display owner's username */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubList;
