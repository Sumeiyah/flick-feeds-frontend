import React from "react";
import '../indexL.css';
function Login(){

    return (
        
        <section className="login-sectionn">
        <section>
        <div className="login-box">
            <form action="">
                <h2>Login</h2>
                <div className="input-box">
    
                    <input type="Username" required/>
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                        </span>
                    <input type="password" required></input>
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
                    <p>Don't have an account? <a href="nn">Register</a></p>
                </div>
            </form>
        </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </section>

     
    
      );

}

export default Login;