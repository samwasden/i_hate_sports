import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";

function Register(props) {
  const {setlogin} = props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/home");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div className="login_panel">
      <div className="login_container">
        <input
          type="text"
          className="login_textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <button className="login_btn" onClick={register}>
          Register
        </button>
        <button
          className="login_btn login_google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div className='login_prompt'>
          Already have an account? 
        </div>
        <button className='login_link' onClick={(e) => {
          e.preventDefault()
          setlogin(true)
          }}>Login</button>
      </div>
    </div>
  );
}
export default Register;