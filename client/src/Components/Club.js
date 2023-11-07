import React from "react";
import { BrowserRouter as Router, Routes, Route, Link ,Outlet} from "react-router-dom";
import ClubList from './Components/ClubList'; 
import ClubCreationForm from './Components/ClubCreationForm'; 
import backgroundImage from "./istockphoto-1419766496-170667a.webp"; 
import Profile from "./Components/Profile"; 


const navStyle = {
  backgroundColor: "black",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px 20px",
};

const pageStyle = {
  background: `url(${backgroundImage})`,
  backgroundSize: "cover",
  color: "white",
  padding: "20px",
  minHeight: "100vh",
};

function App() {

  return (
 
    <>
      <div className="app" style={pageStyle}>
        <nav style={navStyle}>
          <div>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
            <Link to="/create-club" style={linkStyle}>
              Create Club
            </Link>
            <Link to="/clubs" style={linkStyle}>
              Clubs
            </Link>
          </div>
          <div>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
            <Link to="/logout" style={linkStyle}>
              Logout
            </Link>
          </div>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<div>Home Page Content</div>} />
            <Route path="/create-club" element={<ClubCreationForm />} />
            <Route path="/clubs" element={<ClubList />} /> {/* New route for ClubList */}
            <Route path="/profile" element={<Profile />} /> {/* New route for UserProfileList */}
            <Route path="/logout" element={<div>Logout Page Content</div>} />
          </Routes>
        </div>
        <Outlet/>
      </div>
    </>
  );
}

export default App;