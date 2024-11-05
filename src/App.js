// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import Feed from './pages/Feed';
import ProfilePage from './pages/ProfilePage';
import Clubs from './pages/Clubs';
import NavBar from './components/NavBar';
import UpdateProfile from './pages/UpdateProfile';


function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          {/* Update this line to accept a username parameter */}
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/update_profile/:userId" element={<UpdateProfile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
