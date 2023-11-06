import React, { useState } from 'react';
//import '../App.css';
import '../indexL.css';
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

    fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCred)
    })
      .then(res => {
        //handle status code check hhhh

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
    <section className="login-sectionn">
        <section>
        <div className="login-box">
            {/* <form action=""> */}
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-box">
    
                    {/* <input type="Username" required/> */}
                    <input type="username" required value={username} onChange={e => setUsername(e.target.value)} />
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                        </span>
                    {/* <input type="password" required></input> */}
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox"></input>
                        remember me
                        </label>
                    <a href="mm">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href='/signup'>Register</a></p>
                </div>
            </form>
        </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </section>
    </>
  );
}

export default Login;