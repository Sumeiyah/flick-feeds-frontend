import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubCard = () => {
  // State variables
  const [clubsData, setClubsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [expandedClub, setExpandedClub] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showCreateClubForm, setShowCreateClubForm] = useState(false);
  const [newClubData, setNewClubData] = useState({
    clubName: '',
    clubGenre: '',
    description: '',
    selectedMembers: [],
  });
  const [allMembers, setAllMembers] = useState([]);

  // useEffect for fetching data from APIs
  useEffect(() => {
    // Fetch clubs data
    axios
      .get('https://flickfeeds-602d4f3e68d7.herokuapp.com/clubs')
      .then((response) => {
        setClubsData(response.data.clubs);
      })
      .catch((error) => {
        console.error('Error fetching clubs data:', error);
      });

    // Fetch posts data
    axios
      .get('https://flickfeeds-602d4f3e68d7.herokuapp.com/posts')
      .then((response) => {
        setPostsData(response.data.posts);
      })
      .catch((error) => {
        console.error('Error fetching posts data:', error);
      });

    // Fetch all members data from your API or source
    // Replace 'https://your-members-api-url' with the actual API endpoint
    axios
      .get('https://your-members-api-url')
      .then((response) => {
        setAllMembers(response.data.members);
      })
      .catch((error) => {
        console.error('Error fetching members data:', error);
      });
  }, []);

  // Function to generate club descriptions
  const generateClubDescription = (club) => {
    return `Welcome to the ${club.Name} club! This is a community of ${club.Genre} enthusiasts. ${club.Description}`;
  };

  // Function to toggle the display of the "Posts" section
  const handleTogglePosts = (club) => {
    if (expandedClub === club.ClubID) {
      setExpandedClub(null); // Collapse the "Posts" section if it's already open
    } else {
      setExpandedClub(club.ClubID); // Expand the "Posts" section for the clicked club
    }
  };

  // Shuffle the postsData array
  const shuffledPosts = [...postsData].sort(() => Math.random() - 0.5);

  // Function to handle clicking "Create Club" button
  const handleCreateClubClick = () => {
    setShowCreateClubForm(!showCreateClubForm); // Toggle the form display
  };

  // Function to handle selecting a member in the create club form
  const handleMemberSelection = (event) => {
    const selectedMemberId = event.target.value;
    const selectedMember = allMembers.find(
      (member) => member.id === selectedMemberId
    );

    if (selectedMember) {
      // Add the selected member to the list of selected members
      setNewClubData({
        ...newClubData,
        selectedMembers: [...newClubData.selectedMembers, selectedMember],
      });
    }
  };

  // Function to handle joining a club
  const handleJoinClubClick = (club) => {
    // You can add code here to handle joining the club
    console.log('Joined club:', club.Name);
  };

  // Filter clubs based on the search text
  const filteredClubs = clubsData.filter((club) =>
    club.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to handle the "Search" button click
  const handleSearchClick = () => {
    // Add your search logic here
    console.log('Search clicked with text:', searchText);
  };

  // Function to handle form submission when creating a club
  const handleCreateClubFormSubmit = (event) => {
    event.preventDefault();

    // You can add code here to handle the form submission and make a POST request to create a new club
    // For now, we'll just log the form data to the console
    console.log('Form submitted:', newClubData);

    // After handling the form submission, you can reset the form and close it
    setShowCreateClubForm(false);
  };

  // CSS for the green buttons
  const greenButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  // CSS for the Create Club form
  const createClubFormStyle = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
  };

  // CSS for text fields and labels
  const formFieldStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  // JSX for rendering the component
  return (
    <div className="club-card">
      <div className="search-and-create">
        <input
          type="text"
          placeholder="Search Club"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearchClick} style={greenButtonStyle}>
          Search
        </button>
        <button onClick={handleCreateClubClick} style={greenButtonStyle}>
          {showCreateClubForm ? 'Cancel' : 'Create Club'}
        </button>
      </div>

      {showCreateClubForm && (
        <div className="create-club-form" style={createClubFormStyle}>
          <h3>Create Club</h3>
          <form onSubmit={handleCreateClubFormSubmit}>
            <div style={formFieldStyle}>
              <label htmlFor="clubName" style={labelStyle}>
                Club Name:
              </label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                required
                style={inputStyle}
                onChange={(e) =>
                  setNewClubData({ ...newClubData, clubName: e.target.value })
                }
              />
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="clubGenre" style={labelStyle}>
                Club Genre:
              </label>
              <input
                type="text"
                id="clubGenre"
                name="clubGenre"
                required
                style={inputStyle}
                onChange={(e) =>
                  setNewClubData({ ...newClubData, clubGenre: e.target.value })
                }
              />
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="description" style={labelStyle}>
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                style={{
                  ...inputStyle,
                  height: '100px', // Adjust the height as needed
                }}
                onChange={(e) =>
                  setNewClubData({
                    ...newClubData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="members" style={labelStyle}>
                Members:
              </label>
              <select
                id="members"
                name="members"
                onChange={handleMemberSelection}
                style={inputStyle}
              >
                <option value="">Select a member</option>
                {allMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={formFieldStyle}>
              <button type="submit" style={greenButtonStyle}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="club-card-container">
        {filteredClubs.map((club, index) => {
          // Filter posts that belong to the current club
          const clubPosts = shuffledPosts.filter(
            (post) => post.MovieID === club.ClubID
          );

          // Randomly select 3 to 6 posts for the current club
          const selectedClubPosts = clubPosts.slice(
            0,
            Math.floor(Math.random() * (6 - 3 + 1)) + 3
          );

          return (
            <div
              key={index}
              className={`club-card-item ${
                expandedClub === club.ClubID ? 'expanded-club' : ''
              }`}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '20px',
                padding: '20px',
                width: '300px',
                display: 'inline-block',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                position: 'relative', // Ensure that the expanded club stays on top
              }}
            >
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {club.Name}
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                Genre: {club.Genre}
              </p>
              <p
                style={{
                  fontSize: '14px',
                }}
              >
                {generateClubDescription(club)}
              </p>
              <h3>Members</h3>
              <ul
                className="members-list"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {newClubData.selectedMembers.map((member) => (
                  <li key={member.id}>{member.name}</li>
                ))}
              </ul>
              {/* Make the "Posts" text clickable */}
              <button
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  width: '100%',
                  marginTop: '10px',
                }}
                onClick={() => handleTogglePosts(club)}
              >
                View Posts
              </button>
              {expandedClub === club.ClubID && (
                <div className="post-card" style={{ marginTop: '10px' }}>
                  {selectedClubPosts.map((post, postIndex) => (
                    <div key={postIndex} className="post-item">
                      <img
                        src={post.ImagePath}
                        alt="Post"
                        style={{
                          width: '50px', // Set the image size to 50px by 50px
                          height: '50px',
                        }}
                      />
                      <p>Rating: {post.Rating}</p>
                      <p>Review: {post.Review}</p>
                      {/* Display comments here */}
                    </div>
                  ))}
                </div>
              )}
              <button
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  width: '100%',
                  marginTop: '10px',
                }}
                onClick={() => handleJoinClubClick(club)}
              >
                Join Club
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClubCard;
