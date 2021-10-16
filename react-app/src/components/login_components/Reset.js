import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, sendPasswordResetEmail } from "../firebase/firebase";

function Reset(props) {
  const {setreset, setlogin} = props
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="login_btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send reset email
        </button>
        <div className='login_prompt'>
          Don't have an account? 
        </div>
        <button className='login_link' onClick={(e) => {
          e.preventDefault()
          setreset(false)
          setlogin(false)
        }}>Register</button>
      </div>
    </div>
  );
}
export default Reset;