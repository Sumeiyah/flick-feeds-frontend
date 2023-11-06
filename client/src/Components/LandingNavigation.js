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
            {/* <Link to='/signup' className='logout-button'>Sign Up</Link> */}
            <Link to='/login' className='logout-button'>Log In</Link>
        </div>
    </div>
  )
}

export default Nav