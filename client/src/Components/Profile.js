
import React from 'react';
import '../indexP.css';
function Profile(){

    return (
      

                 <section className="profile_section">

                    <div class="header__wrapper">
                        <header></header>
                        <div className="cols__container">
                            <div className="left__col">
                                <div className="img__container">
                                    <img src="https://media.istockphoto.com/id/485082268/photo/young-black-woman-at-home.jpg?s=612x612&w=0&k=20&c=bLnGdFCf7QbOXr0dYkq-OUVl9bNEB6cKyH-jtv6dGSo=" alt="Adam Smith"/>
                                    <span></span>
                                    </div>
                                    
                                    <h2>Anna Smith</h2>
                                    <p>UI/UX Designer</p>
                                    <p>anna@example.com</p>

                                    <ul className="about">
                                        <li><span>6</span>Posts</li>
                                        <li><span>322</span>Followers</li>
                                        <li><span>800</span>Following</li>
                                    </ul>
                                    <div className="content">
                                        <p>
                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
     
                                        </p>
                                         
                                         <ul>
                                            <li><i className="fab fa-twitter"></i></li>
                                            <li><i className="fab fa-pinterest"></i></li>
                                            <li><i className="fab fa-facebook"></i></li>
                                            <li><i className="fab fa-dribbble"></i></li>
                                         </ul>
                                    </div>
                                </div>
                                 <div className="right__col">
                                    <nav>
                                        <ul>
                                            <li><a href="p">photos</a></li>
                                            <li><a href="m">movie clubs</a></li>
                                            <li><a href="g">groups</a></li>
                                            <li><a href="a">about</a></li>
                                        </ul>
                                        <button>Edit profile</button>
                                    </nav>

                                    <div className="photos">
                                       
                                       <div>
                                       <div>
                                        <img src="https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg" alt="Photo"/>
                                        </div>
                                        <p className="grout">The Lego Movie</p>
                                        <p>I loved the great humor in the movie. My best movie so far.</p>
                                        </div>

 

                                    </div>

                                 </div>

                            </div>
                        </div>                
                      
                 </section>
       
     
    
      );

}

export default Profile;