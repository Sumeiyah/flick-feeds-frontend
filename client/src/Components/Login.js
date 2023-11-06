import React, { useState } from 'react';
import '../App.css';
import LandingNavigation from './LandingNavigation'
import { useNavigate } from "react-router-dom";

function Login() {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  const navigate = useNavigate()

  let loginCred = {
    username: username,
    password: password
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    fetch('https://trial1714-c295f7216f30.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCred)
    })
      .then(res => {
        //handle status code check hhh

        if(!res.ok){
            console.log(res.ok)


          navigate('/login')
        }
        else{
            return res.json() 
        }
      
      })
      .then(data => {
        console.log(data)
        if (data) {
          console.log(data.message)

          navigate("/dashboard");
          

        } else {
          // handle redirect or error message
        }
      })

  }

  return (
    <>
    <LandingNavigation />
    <form onSubmit={handleSubmit}>
      <div className='login'>
        <div className='header'>
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            {/* <img src={email_icon} alt="" className='icon' /> */}
            <input type="username" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input">
            {/* <img src={password_icon} alt="" className='icon' /> */}
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='forgot-password'>Lost Password?<span> Click Here!</span></div>

          <div className='submit-container'>
            <input type='submit' className='submit' value='Log in' />
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

export default Login;