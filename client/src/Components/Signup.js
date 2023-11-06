import React, { useState } from 'react';
//import '../App.css';
import '../indexS.css';
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

    if (password ===confirmPassword) {
      fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/register', {
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
      <section className="signup-sectionN"> 
        <section>
        <div className="login-boxN">
            {/* <form action=""> */}
            <form onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <div className="input-boxN">
                    <span className="icon">
    
                        </span>
                    {/* <input type="Username" required/> */}
                    <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                    <label>Username</label>
                </div>

                <div className="input-boxN">
                    <span className="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                        </span>
                    {/* <input type="password" required></input> */}
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>

                <div className="input-boxN">
                    <span className="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                        </span>
                    {/* <input type="password" required></input> */}
                    <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <label>Confirm Password</label>
                </div>

                <div className="input-boxN">
                    <span className="icon">
                        <ion-icon name="mail"></ion-icon>
                        </span>
                    {/* <input type="email" required/> */}
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>
               
         

                <button type="submit">Register</button>

            </form>
        </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </section>
    </>
  );
}

export default SignUp;