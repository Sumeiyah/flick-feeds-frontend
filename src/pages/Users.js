// src/pages/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://flick-feeds-backend.onrender.com/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-semibold text-red-500 mb-6">Users</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
          <div key={user.UserID} className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-white font-semibold">{user.Username}</h3>
            <p className="text-gray-400 text-sm">{user.Bio}</p>
            <button className="mt-2 bg-red-600 px-4 py-1 rounded">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
