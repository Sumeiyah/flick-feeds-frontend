import React from 'react'
import {Link} from 'react-router-dom'
import '../Base.css'

function Nav() {
  return (
    
     <div className='navigation'>
        <div className='links'>
            <Link to='/' className='home-link'>MVC</Link>
        </div>
        <div className='buttons'>

            <Link to='/profile' className='logout-button'>Profile</Link>
            <Link to='/explore-movies' className='logout-button'>Explore movies</Link>
            <Link to='/movie-clubs' className='logout-button'>Movie clubs</Link>
            <Link to='/about' className='logout-button'>About</Link>
            <Link to='/signup' className='logout-button'>Sign In</Link>
            <Link to='/login' className='logout-button'>Log In</Link>

        </div>
    </div>
  )
}

export default Nav

