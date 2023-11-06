import React from 'react'
import { Link } from 'react-router-dom';
import LandingNavigation from './LandingNavigation'
import '../App.css';
import '../Base.css'


function Landing() {
  return (
    <div className="landing-App">
      {/* <header className="landing-header">
        <h1> rtm </h1>
        <div className="landing-login-button-container">
          <Link to="/login" className="landing-login-button">Login</Link>
          <Link to="/signup" className="landing-login-button">Sign Up</Link>
        </div>
      </header> */}
      <LandingNavigation />
      <main className="landing-main">
        <section id="about" className="landing-about">
          <h2></h2>
          <p>
          
          </p>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-contact-info">
          <p>Contact Us: 0700000000</p>
          <p>Email: info@mvc.com</p>
        </div>
        <p>&copy; {new Date().getFullYear()} mvc. Movie Club Management System Inc.</p>
      </footer>
    </div>
  )
}

export default Landing 