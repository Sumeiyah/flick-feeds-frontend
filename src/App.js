// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import Feed from './pages/Feed';
import UserProfile from './pages/UserProfile';
import Clubs from './pages/Clubs';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';

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
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/clubs" element={<Clubs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
