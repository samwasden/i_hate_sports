import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { Button, TextField, FormLabel, Box } from "@mui/material";
import {Theme} from "../global_components/Theme";
import { ThemeProvider } from "@emotion/react";
import {
  appAuth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";

function Register(props) {
  const {setlogin} = props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(appAuth);
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
      <ThemeProvider theme={Theme}>
      <div className="template_container" id='register_container'>
        <TextField
          type="text"
          className="login_textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Full Name"
          InputProps={{ style: { color: "white" } }}
        />
        <TextField
          type="email"
          className="login_textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail Address"
          InputProps={{ style: { color: "white" } }}
        />
        <TextField
          type="password"
          className="login_textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          InputProps={{ style: { color: "white" } }}
        />
        <Button 
          variant='contained'
          className="login_btn" 
          onClick={register}>
          Register
        </Button>
        <Button
          variant='outlined'
          className="login_btn login_google"
          onClick={signInWithGoogle}>
          Register with Google
        </Button>
        <FormLabel className='login_prompt'>
          Already have an account? 
        </FormLabel>
        <Button className='login_link' onClick={(e) => {
          e.preventDefault()
          setlogin(true)
          }}>
            <Box className='login_link'>Login</Box>
          </Button>
      </div>
      </ThemeProvider>
    </div>
  );
}
export default Register;