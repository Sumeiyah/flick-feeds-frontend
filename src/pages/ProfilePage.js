import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [userClubs, setUserClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showSection, setShowSection] = useState('watchedMovies');
  const [isFollowing, setIsFollowing] = useState(false); // Follow status

  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://127.0.0.1:5000/profile/${username}`);
        setUser(userResponse.data);

        const followersResponse = await axios.get(`http://127.0.0.1:5000/followers/${username}`);
        setFollowers(followersResponse.data.followers_count);

        const followingResponse = await axios.get(`http://127.0.0.1:5000/following/${username}`);
        setFollowing(followingResponse.data.following_count);

        const watchedMoviesResponse = await axios.get(`http://127.0.0.1:5000/watched_movies/${username}`);
        setWatchedMovies(watchedMoviesResponse.data.watched_movies || []);

        const sharedPostsResponse = await axios.get(`http://127.0.0.1:5000/get_user_posts/${username}`);
        setSharedPosts(sharedPostsResponse.data.posts || []);

        const userClubsResponse = await axios.get(`http://127.0.0.1:5000/user_clubs/${username}`);
        setUserClubs(userClubsResponse.data.clubs || []);

        // Fetch follow status
        const token = localStorage.getItem('access_token');
        const followStatusResponse = await axios.get(
          `http://127.0.0.1:5000/follow_status/${userResponse.data.UserID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFollowing(followStatusResponse.data.is_following);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [username]);

  const handleSectionChange = (section) => {
    setShowSection(section);
  };

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`http://127.0.0.1:5000/follow_user/${user.UserID}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFollowing(true);
      setFollowers((prev) => prev + 1);
    } catch (error) {
      console.error('Error following user:', error);
      alert(error.response?.data?.message || 'Failed to follow. Please try again.');
    }
  };

  const handleUnfollow = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:5000/unfollow_user/${user.UserID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFollowing(false);
      setFollowers((prev) => prev - 1);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      alert(error.response?.data?.message || 'Failed to unfollow. Please try again.');
    }
  };

  const handleUpdateProfile = () => {
    window.location.href = `/update_profile/${user?.UserID}`;
  };

  const handleLeaveClub = async (clubId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/leave_club/${clubId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setUserClubs((prevClubs) => prevClubs.filter((club) => club.ClubID !== clubId));
      setSelectedClub(null);
    } catch (error) {
      console.error('Error leaving club:', error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      setSelectedClub(null);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 text-white">
      <div className="flex items-center mb-6">
        <img
          src={user.ProfilePicture || 'https://via.placeholder.com/40'}
          alt={user.Username}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.Username}</h1>
          <p className="text-gray-400">{user.Bio}</p>
          <p className="text-gray-400">{user.Email}</p>
          <p className="text-sm text-gray-500 mt-2">Followers: {followers} | Following: {following}</p>

          {/* Show Follow/Unfollow buttons */}
          {currentUser !== username && (
            <>
              {isFollowing ? (
                <button
                  onClick={handleUnfollow}
                  className="bg-red-500 px-4 py-2 rounded text-white mt-4 hover:bg-red-600"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="bg-green-500 px-4 py-2 rounded text-white mt-4 hover:bg-green-600"
                >
                  Follow
                </button>
              )}
            </>
          )}

          {/* Show Edit Profile button only if current user matches the searched user */}
          {currentUser === username && (
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-500 px-4 py-2 rounded text-white mt-4 hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-around border-t border-gray-700 pt-4">
        <button
          className={`text-lg font-semibold ${
            showSection === 'watchedMovies' ? 'text-blue-500' : 'text-gray-400'
          }`}
          onClick={() => handleSectionChange('watchedMovies')}
        >
          Watched Movies
        </button>
        <button
          className={`text-lg font-semibold ${
            showSection === 'sharedPosts' ? 'text-blue-500' : 'text-gray-400'
          }`}
          onClick={() => handleSectionChange('sharedPosts')}
        >
          Shared Posts
        </button>
        <button
          className={`text-lg font-semibold ${
            showSection === 'userClubs' ? 'text-blue-500' : 'text-gray-400'
          }`}
          onClick={() => handleSectionChange('userClubs')}
        >
          Clubs
        </button>
      </div>

      {/* Watched Movies Section */}
      {showSection === 'watchedMovies' && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {watchedMovies.map((movie) => (
            <div key={movie.MovieID} className="p-4 bg-gray-800 rounded-lg">
              {movie.ImagePath && (
                <img
                  src={movie.ImagePath}
                  alt={movie.Title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <p className="text-center font-bold">{movie.Title}</p>
              <p className="text-center text-sm text-gray-400">
                {movie.Genre} | {movie.ReleaseYear}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Shared Posts Section */}
      {showSection === 'sharedPosts' && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sharedPosts.map((post) => (
            <Link
              to={`/share_post/${post.PostID}`}
              key={post.PostID}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              {post.ImagePath && (
                <img
                  src={post.ImagePath}
                  alt={post.Movie?.Title || post.Title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <p className="text-center font-bold">{post.Movie?.Title || post.Title || 'Untitled'}</p>
              <p className="text-center text-sm text-gray-400">
                Rating: {post.Rating || 'N/A'} | Review: {post.Review || 'No review'}
              </p>
              <p className="text-center text-xs text-gray-500">
                By: {post.Author?.Username || 'Unknown'}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Clubs Section */}
      {showSection === 'userClubs' && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userClubs.map((club) => (
            <div
              key={club.ClubID}
              className="p-6 bg-gray-900 rounded-lg shadow-lg hover:scale-105 transition"
              onClick={() => setSelectedClub(club)}
            >
              <h2 className="text-center font-bold text-lg text-red-500">{club.Name}</h2>
              <p className="text-center text-sm text-gray-400 mt-2">{club.Description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Club Modal */}
      {selectedClub && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80 sm:w-96">
            <h2 className="text-center font-bold text-lg text-red-500">{selectedClub.Name}</h2>
            <p className="text-center text-sm text-gray-400 mt-2">{selectedClub.Description}</p>
            <p className="text-center text-xs text-gray-500 mt-4">Owner: {selectedClub.OwnerUsername}</p>

            <div className="text-center mt-4">
              <h3 className="font-semibold text-sm text-gray-300">
                Members ({selectedClub.Members?.length || 0}):
              </h3>
              <ul className="text-xs text-gray-300 mt-1">
                {selectedClub.Members?.length ? (
                  selectedClub.Members.map((member) => (
                    <li key={member.UserID}>{member.Username}</li>
                  ))
                ) : (
                  <li>No members yet</li>
                )}
              </ul>
            </div>

            {currentUser === username && (
              <button
                onClick={() => handleLeaveClub(selectedClub.ClubID)}
                className="bg-red-500 w-full px-4 py-2 mt-4 rounded text-white hover:bg-red-600"
              >
                Leave Club
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
