import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css';
import '../Base.css'

function Nav() {


  return (
    // <div className='navigation'>
    //     <div className='links'>
    //         {/* <Link to='/dashboard' className='home-link'>MVC</Link> */}
    //         <Link to='/dashboard' className='home-link'>MVC</Link>
    //         <Link to='/profile'>Profile</Link>
    //         <Link to='/explore-movies'>Explore movies</Link>
    //         <Link to='/movie-clubs'>Movie clubs</Link>
    //         <Link to='/about'>About</Link>
    //     </div>

    // </div>

<div className='navigation'>
<div className='links'>
    <Link to='/' className='home-link'>MVC</Link>
</div>
<div className='buttons'>

     <Link to='/profile' className='logout-button'>Profile</Link>
     <Link to='/explore-movies' className='logout-button'>Explore movies</Link>
     <Link to='/movie-clubs' className='logout-button'>Movie clubs</Link>
     <Link to='/about' className='logout-button'>About</Link>
     
    <Link to='/' className='logout-button'>Log out</Link>
   

</div>
</div>
  )
}

export default Nav