import React, { useState } from 'react';
import '../App.css';
import LandingNavigation from './LandingNavigation'
// import user_icon from '../Images/user_icon.png';
// import email_icon from '../Images/email_icon.png';
// import password_icon from '../Images/password_icon.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  let navigate = useNavigate()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')
  let [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    let loginCred = {
      username: username,
      password: password,
      email: email,
     
    }

    console.log(loginCred);
    console.log(JSON.stringify(loginCred));

    if (password == confirmPassword) {
      fetch('https://trial1714-c295f7216f30.herokuapp.com/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginCred)
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          navigate("/login");
        })
    } else {
      alert('Password must be same')
    }
  }

  return (
    <>
      <LandingNavigation />
      <form onSubmit={handleSubmit}>
        <div className='login'>
          <div className='header'>
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">

            <div className="input">
              {/* <img src={user_icon} alt="" className='icon' /> */}
              <input type="text" placeholder='Username' required value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="input">
              {/* <img src={password_icon} alt="" className='icon' /> */}
              <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input">
              {/* <img src={password_icon} alt="" className='icon' /> */}
              <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div className="input">
              {/* <img src={email_icon} alt="" className='icon' /> */}
              <input type="email" required placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className='submit-container'>
              <input type='submit' className='submit' value='Sign Up' />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;