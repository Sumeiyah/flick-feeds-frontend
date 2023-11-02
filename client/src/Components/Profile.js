
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

                                        <div>
                                       <div>
                                        <img src="https://m.media-amazon.com/images/M/MV5BNjc4NmQyNGUtMDg4NS00ZTZkLWI3ODQtMGJmYThiYjQxNGRiXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg" alt="Photo"/>
                                        </div>
                                        <p className="grout">The Simpsons Movie</p>
                                        <p>The union in the movie was good.</p>
                                        </div>
                                       
                                        <div>
                                       <div>
                                        <img src="https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg" alt="Photo"/>
                                        </div>
                                        <p className="grout">El Camino: A Breaking Bad Movie</p>
                                        <p>One of my best animated movies forsho.</p>
                                        </div>

                                        <div>
                                       <div>
                                        <img src="https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" alt="Photo"/>
                                        </div>
                                        <p className="grout">Scary Movie</p>
                                        <p>I loved the great humor in the movie. My best movie so far.</p>
                                        </div>

                                        <div>
                                       <div>
                                        <img src="https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SX300.jpg" alt="Photo"/>
                                        </div>
                                        <p className="grout">The Super Mario Bros. Movie</p>
                                        <p>I loved the great humor in the movie. My best movie so far.</p>
                                        </div>

                                        <div>
                                       <div>
                                        <img src="https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_SX300.jpg" alt="Photo"/>
                                        </div>
                                        <p className="grout">Bee Movie</p>
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