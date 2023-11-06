
import React, { useEffect, useState } from 'react';

import '../App.css';
import '../indexE.css';
import LandingNavigation2 from './LandingNavigation2'

//import '../index2.css';
const ExploreMovies=()=> {

    const [users,setUsers]=useState([]);

    const getUsers = async () => {
    fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/movies')
    .then(response=>response.json())
    .then(data=> setUsers(data.movies)); 
}

useEffect(()=>{
    getUsers();
},[]);


    return (

        <>
        <LandingNavigation2 />
      
        <section className="explore_movies_section">

                    <div className="header__wrapper">
                        <div className="cols__containerE">
 
                                 {/* <div className="right__col"> */}
                                

                                    <nav>
                                        <ul>
                                            <li><a href="a">Search by year</a></li>
                                            <li><a href="b">Quality</a></li>
                                            <li><a href="c">LATEST MOVIES</a></li>
                                            <li><a href="d">Tv Series</a></li>
                                            <li><a href="e">Genre</a></li>
                                        </ul>
                                        {/* <button>Edit profile</button>  */}
                                        <div className="search_input">
                                        <form>
                                          <input type="text" name="search" placeholder="Search.."/>
                                         </form>
                                         </div>
                                    </nav>
                                    

                                    <div className="photos">
 {/* //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm     */}
{
    users.map((curElem)=> {
        return (
            <div key={curElem.id}>
            <div>
            <img src={curElem.ImagePath} alt='g'/>
             </div>
             <p className="grout">{curElem.Title}</p>
             </div>
        )
    })
}

 {/* //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm   */}



                                    </div>

                                 {/* </div> */}

                            </div>
                        </div>                
                      
                        </section>
             </>
     
    
      );

}

export default ExploreMovies;