import React from 'react';

function UserProfile({ user }) {
  return (
    <div>
      <h3>{user.Username}</h3>
      <p>Bio: {user.Bio}</p>
      <p>Contact Details: {user.ContactDetails}</p>
      {/* Add more user details here as needed */}
    </div>
  );
}

export default UserProfile;
