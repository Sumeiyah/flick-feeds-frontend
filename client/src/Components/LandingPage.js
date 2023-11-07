import "../LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <div className="header">
          <div className="brand-name">XENON</div>
          <nav className="nav-menu">
            <ul>
              
              <li><a href="#home">Home</a></li>
              <li><a href="#profile">Profile</a></li>
              <li><a href="#explore-movies">Explore Movies</a></li>
              <li><a href="#movie-clubs">Movie Clubs</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
        </div>
        <div className="cta-content">
          <p className="tagline">Your ticket to Movie Magic Awaits</p>
          <p className="subtagline">
            The quest is not just about finding physical treasures; it's about self-discovery and personal growth. As the adventurers journey deeper into the uncharted wilderness, they face an array of moral and ethical dilemmas. These challenges force them to confront their inner demons, fears, and long-buried regrets. Friendships are tested, and loyalties are strained. Amid the unforgiving terrain and the moral quagmire they find themselves in, the adventurers must grapple with the weight of their decisions. Betrayal, redemption, and forgiveness become ever more complex themes that echo throughout the film, making it a deeply introspective and emotionally charged journey for each member of the group.
          </p>
          <div className="cta-subtext">Dive In Now!!</div>
        </div>
        <div className="access-info">
          <div className="cta-buttons">
            <a href="#signup" className="cta-button cta-signup">Sign Up</a>
            <a href="#login" className="cta-button cta-login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
