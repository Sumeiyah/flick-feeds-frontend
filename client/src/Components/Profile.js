
import React, { useEffect, useState } from 'react';
import '../indexP.css';

import '../App.css';
import LandingNavigation2 from './LandingNavigation2'




const Profile=()=> {

        const [users,setUsers]=useState([]);
    
        const getUsers = async () => {
        fetch('https://trial1714-c295f7216f30.herokuapp.com/movies')
        .then(response=>response.json())
        .then(data=> setUsers(data.movies)); 
    }
    
    useEffect(()=>{
        getUsers();
    },[]);
    

    return (
      
        <>
        <LandingNavigation2 />
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
                                       


{/* //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm     */}
{
    users.map((curElem)=> {
        return (
            <div key={curElem.id}>
            <div>
            <img src={curElem.ImagePath} alt='avatar'/>
             </div>
             <p className="grout">{curElem.Title}</p>
             </div>
        )
    })
}

 {/* //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm   */}

 

                                    </div>

                                 </div>

                            </div>
                        </div>                
                      
                 </section>
                 </>
     
    
      );

}

export default Profile;