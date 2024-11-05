// src/pages/UpdateProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    profilePicture: '',
    bio: '',
    email: '',
    contactDetails: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user data for pre-filled fields
    axios.get(`http://127.0.0.1:5000/profile/${userId}`)
      .then(response => {
        setUserData({
          profilePicture: response.data.ProfilePicture || '',
          bio: response.data.Bio || '',
          email: response.data.Email || '',
          contactDetails: response.data.ContactDetails || ''
        });
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    axios.put(`http://127.0.0.1:5000/update_profile/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        alert('Profile updated successfully!');
        navigate(`/profile/${userId}`); // Redirect to profile page
      })
      .catch(error => {
        alert('Error updating profile');
        console.error('Update profile error:', error);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white max-w-lg rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>

        {/* Profile Picture URL */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Profile Picture URL</label>
          <input
            type="text"
            name="profilePicture"
            value={userData.profilePicture}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Enter picture URL"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Bio</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Enter your bio"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Enter your email"
          />
        </div>

        {/* Contact Details */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Contact Details</label>
          <input
            type="text"
            name="contactDetails"
            value={userData.contactDetails}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Enter contact details"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded font-bold hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
