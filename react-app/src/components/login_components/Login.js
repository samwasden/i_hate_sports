import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './login_stylesheets/Login.css'

function Login(props) {
    const {setlogin, setreset} = props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) history.replace("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);
    return (
      <div className="login_panel">
        <div className="login_container">
          <input
            type="text"
            className="login_textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login_textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login_btn"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button className="login_btn login_google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <div>
            <button className='login_link' onClick={(e) => {
              e.preventDefault()
              setreset(true)
            }}>Forgot Password</button>
          </div>
          <div className='login_prompt'>
            Don't have an account? 
          </div>
            <button className='login_link' onClick={(e) => {
                e.preventDefault()
                setlogin(false)
              }}>Register</button>
        </div>
      </div>
    );
  }
  export default Login;
