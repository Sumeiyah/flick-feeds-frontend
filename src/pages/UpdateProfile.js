// src/pages/UpdateProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  useEffect(() => {
    // Fetch the current user data
    axios.get(`https://flick-feeds-backend.onrender.com/profile/${localStorage.getItem('username')}`)
      .then(response => {
        setUser(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setProfilePicture(response.data.ProfilePicture || '');
        setBio(response.data.Bio || '');
        setContactDetails(response.data.ContactDetails || '');
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      // Only include fields that have been changed
      const updatedData = {};
      if (username && username !== user.Username) updatedData.username = username;
      if (email && email !== user.Email) updatedData.email = email;
      if (profilePicture && profilePicture !== user.ProfilePicture) updatedData.profilePicture = profilePicture;
      if (bio && bio !== user.Bio) updatedData.bio = bio;
      if (contactDetails && contactDetails !== user.ContactDetails) updatedData.contactDetails = contactDetails;

      // Send the update request
      const response = await axios.put(`https://flick-feeds-backend.onrender.com/update_profile/${userId}`, updatedData);
      
      if (response.status === 200) {
        alert('Profile updated successfully!');
        // Redirect to the profile page with the username
        navigate(`/profile/${username}`);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('An error occurred while updating your profile');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300">Profile Picture URL</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-300">Contact Details</label>
          <input
            type="text"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
