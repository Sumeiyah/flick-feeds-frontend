import React from "react";
import '../indexS.css';
function Signup(){

    return (
    //   nnnn  
    <section className="signup-section"> 
        <section>
        <div className="login-box">
            <form action="">
                <h2>Sign up</h2>
                <div className="input-box">
                    <span className="icon">
    
                        </span>
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

                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                        </span>
                    <input type="password" required></input>
                    <label>Confirm Password</label>
                </div>

                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="mail"></ion-icon>
                        </span>
                    <input type="email" required/>
                    <label>Email</label>
                </div>
               
         

                <button type="submit">Register</button>

            </form>
        </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </section>
     
    
      );

}

export default Signup;