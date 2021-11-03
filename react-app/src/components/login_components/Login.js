import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { appAuth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './login_stylesheets/Login.css'
import { Button, TextField, FormLabel, FormGroup, Box } from "@mui/material";
import {Theme} from "../global_components/Theme";
import { ThemeProvider } from "@emotion/react";


function Login(props) {
    const {setlogin, setreset} = props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(appAuth);
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
        <ThemeProvider theme={Theme}>
        <FormGroup className="template_container" id='login_container'>
          <TextField
            type={email}
            variant="outlined"
            className="login_textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            type='password'
            variant="outlined"
            className="login_textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            InputProps={{ style: { color: "white" } }}
          />
          <Button
            variant='contained'
            className="login_btn"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </Button>
          <Button 
            variant='outlined'
            className="login_btn login_google" 
            onClick={signInWithGoogle}>
            Login with Google
          </Button>
          <div>
            <Button 
              variant='text'
              className='login_link' 
              onClick={(e) => {
                e.preventDefault()
                setreset(true)
              }}>
              <Box className='login_link'>Forgot Password</Box>
            </Button>
          </div>
          <FormLabel className='login_prompt'>
            Don't have an account? 
          </FormLabel>
            <Button 
              variant='text'
              className='login_link' 
              onClick={(e) => {
                e.preventDefault()
                setlogin(false)
              }}>
              <Box className='login_link'>Register</Box>
            </Button>
        </FormGroup>
        </ThemeProvider>
      </div>
    );
  }
  export default Login;
