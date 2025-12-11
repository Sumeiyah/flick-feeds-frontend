import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function FollowersModal({ title, list, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 p-6 rounded-lg w-[400px] relative">
        <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
        <ul className="overflow-y-auto max-h-80 p-2 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
          {list.map((user) => (
            <li key={user.UserID} className="flex items-center mb-4">
              <img
                src={user.ProfilePicture || 'https://via.placeholder.com/40'}
                alt={user.Username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <span className="text-white">{user.Username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const currentUser = localStorage.getItem('username');
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        // Fetch Profile
        const userRes = await axios.get(
          `https://flick-feeds-backend.onrender.com/profile/${username}`
        );
        setUser(userRes.data);

        const userId = userRes.data.UserID;

        // Followers count
        const followersRes = await axios.get(
          `https://flick-feeds-backend.onrender.com/followers/${username}`
        );
        setFollowers(followersRes.data.followers_count);

        // Following count
        const followingRes = await axios.get(
          `https://flick-feeds-backend.onrender.com/following/${username}`
        );
        setFollowing(followingRes.data.following_count);

        // WATCHED MOVIES — FIXED ENDPOINT (should use userId)
        const watchedRes = await axios.get(
          `https://flick-feeds-backend.onrender.com/watched_movies/${userId}`
        );
        setWatchedMovies(watchedRes.data.watched_movies || []);

        // POSTS — FIXED ENDPOINT
        const postsRes = await axios.get(
          `https://flick-feeds-backend.onrender.com/get_user_posts/${userId}`
        );
        setSharedPosts(postsRes.data.posts || []);

        // CLUBS (backend-safe)
        const clubsRes = await axios.get(
          `https://flick-feeds-backend.onrender.com/user_clubs/${username}`
        );
        setUserClubs(clubsRes.data.clubs || []);

        // FOLLOW STATUS
        const token = localStorage.getItem('access_token');
        if (token) {
          const statusRes = await axios.get(
            `https://flick-feeds-backend.onrender.com/follow_status/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setIsFollowing(statusRes.data.is_following);
        }
      } catch (err) {
        console.error("Error loading profile page:", err);
      }
    };

    loadProfileData();
  }, [username]);

  // Followers List
  const fetchFollowersList = async () => {
    try {
      const res = await axios.get(
        `https://flick-feeds-backend.onrender.com/followers_list/${username}`
      );
      setFollowersList(res.data.followers);
      setShowFollowersModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Following List
  const fetchFollowingList = async () => {
    try {
      const res = await axios.get(
        `https://flick-feeds-backend.onrender.com/following_list/${username}`
      );
      setFollowingList(res.data.following);
      setShowFollowingModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `https://flick-feeds-backend.onrender.com/follow_user/${user.UserID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(true);
      setFollowers((x) => x + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(
        `https://flick-feeds-backend.onrender.com/unfollow_user/${user.UserID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(false);
      setFollowers((x) => x - 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeaveClub = async (clubId) => {
    try {
      await axios.delete(
        `https://flick-feeds-backend.onrender.com/leave_club/${clubId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
      );
      setUserClubs((prev) => prev.filter((c) => c.ClubID !== clubId));
      setSelectedClub(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="text-white mt-20 text-center">Loading...</p>;

  return (
    <div className="container mx-auto pt-24 py-8 text-white">
      {/* PROFILE HEADER */}
      <div className="flex justify-center items-center mb-6">
        <img
          src={user.ProfilePicture || 'https://via.placeholder.com/40'}
          alt={user.Username}
          className="w-40 h-40 rounded-full mr-4"
        />

        <div>
          <h1 className="text-2xl font-bold">{user.Username}</h1>
          {user.Bio && <p className="text-gray-400">{user.Bio}</p>}
          {user.Email && <p className="text-gray-400">{user.Email}</p>}

          {/* Followers + Following */}
          <div className="flex space-x-4 mt-2">
            <p className="text-sm text-gray-500 cursor-pointer" onClick={fetchFollowersList}>
              <span className="font-bold">{followers}</span> Followers
            </p>
            <p className="text-sm text-gray-500 cursor-pointer" onClick={fetchFollowingList}>
              <span className="font-bold">{following}</span> Following
            </p>
          </div>

          {/* Follow / Unfollow */}
          {currentUser !== username && (
            isFollowing ? (
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
            )
          )}

          {/* Edit Profile */}
          {currentUser === username && (
            <button
              onClick={() => (window.location.href = `/update_profile/${user.UserID}`)}
              className="bg-blue-500 px-4 py-2 rounded text-white mt-4 hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* SECTION NAVIGATION */}
      <div className="flex justify-around border-t border-gray-700 pt-4">
        <button
          className={`text-lg font-semibold ${showSection === 'watchedMovies' ? 'text-blue-500' : 'text-gray-400'}`}
          onClick={() => setShowSection('watchedMovies')}
        >
          Watched Movies
        </button>

        <button
          className={`text-lg font-semibold ${showSection === 'sharedPosts' ? 'text-blue-500' : 'text-gray-400'}`}
          onClick={() => setShowSection('sharedPosts')}
        >
          Shared Posts
        </button>

        <button
          className={`text-lg font-semibold ${showSection === 'userClubs' ? 'text-blue-500' : 'text-gray-400'}`}
          onClick={() => setShowSection('userClubs')}
        >
          Clubs
        </button>
      </div>

      {/* WATCHED MOVIES */}
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
            </div>
          ))}
        </div>
      )}

      {/* SHARED POSTS */}
      {showSection === 'sharedPosts' && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sharedPosts.map((post) => (
            <Link
              to={`/feed?postId=${post.PostID}`}
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
              <p className="text-center font-bold">{post.Movie?.Title || post.Title}</p>
            </Link>
          ))}
        </div>
      )}

      {/* CLUBS */}
      {showSection === 'userClubs' && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userClubs.map((club) => (
            <div
              key={club.ClubID}
              className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedClub(club)}
            >
              {club.ImageURL && (
                <img
                  src={club.ImageURL}
                  alt={club.Name}
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
              )}

              <h2 className="text-xl font-bold text-red-500">{club.Name}</h2>
              {club.Genre && <p className="text-gray-400">Genre: {club.Genre}</p>}
              {club.OwnerUsername && (
                <p className="text-gray-400">Owner: {club.OwnerUsername}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CLUB MODAL */}
      {selectedClub && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => e.target.id === 'overlay' && setSelectedClub(null)}
        >
          <div className="bg-gray-900 p-6 rounded-lg w-[500px] relative">

            <button
              onClick={() => setSelectedClub(null)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              X
            </button>

            {selectedClub.ImageURL && (
              <img
                src={selectedClub.ImageURL}
                alt={selectedClub.Name}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
            )}

            <h2 className="text-xl font-bold text-red-400">{selectedClub.Name}</h2>

            {selectedClub.Genre && <p className="text-gray-400">Genre: {selectedClub.Genre}</p>}
            {selectedClub.OwnerUsername && (
              <p className="text-gray-400">Owner: {selectedClub.OwnerUsername}</p>
            )}

            {selectedClub.Description && (
              <div className="max-h-28 overflow-y-auto p-2 rounded mt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
                <p className="text-gray-400">Description: {selectedClub.Description}</p>
              </div>
            )}

            {/* Movies */}
            {selectedClub.Movies?.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-gray-400 mt-4">
                  Movies ({selectedClub.Movies.length})
                </h3>

                <div className="max-h-20 overflow-y-auto p-2 rounded scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
                  <ul>
                    {selectedClub.Movies.map((movie) => (
                      <li key={movie.MovieID}>
                        <button
                          onClick={() => (window.location.href = `/movie/${movie.MovieID}`)}
                          className="text-blue-500 underline"
                        >
                          {movie.Title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Members */}
            {selectedClub.Members?.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-gray-400 mt-4">
                  Members ({selectedClub.Members.length})
                </h3>

                <div className="max-h-20 overflow-y-auto p-2 rounded scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-900">
                  <ul>
                    {selectedClub.Members.map((member) => (
                      <li key={member.UserID}>{member.Username}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {currentUser === username && (
              <button
                onClick={() => handleLeaveClub(selectedClub.ClubID)}
                className="bg-red-600 w-full px-4 py-2 mt-4 rounded text-white hover:bg-red-700"
              >
                Leave Club
              </button>
            )}
          </div>
        </div>
      )}

      {/* FOLLOWERS modal */}
      {showFollowersModal && (
        <FollowersModal
          title="Followers"
          list={followersList}
          onClose={() => setShowFollowersModal(false)}
        />
      )}

      {/* FOLLOWING modal */}
      {showFollowingModal && (
        <FollowersModal
          title="Following"
          list={followingList}
          onClose={() => setShowFollowingModal(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage;
