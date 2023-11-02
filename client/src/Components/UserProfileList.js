import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

function UserProfileList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Move userIds inside useEffect

    const promises = userIds.map((userId) => {
      return fetch(`https://flickfeeds-602d4f3e68d7.herokuapp.com/profile/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user profile for user ${userId}`);
          }
          return response.json();
        });
    }, [userIds]); // Include userIds in the dependency array

    Promise.all(promises)
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []); // Empty dependency array since userIds is defined inside useEffect

  return (
    <div>
      {users.map((user, index) => (
        <UserProfile key={index} user={user} />
      ))}
    </div>
  );
}

export default UserProfileList;
