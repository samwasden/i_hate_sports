import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { appAuth, sendPasswordResetEmail } from "../firebase/firebase";
import { Button, TextField, FormLabel, Box } from "@mui/material";
import {Theme} from "../global_components/Theme";
import { ThemeProvider } from "@emotion/react";

function Reset(props) {
  const {setreset, setlogin} = props
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(appAuth);
  const history = useHistory();
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/home");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div className="login_panel">
      <ThemeProvider theme={Theme} >
      <div className="template_container" id='reset_container'>
        <TextField
          type="email"
          className="login_textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          InputProps={{ style: { color: "white" } }}
        />
        <Button
          variant='contained'
          className="login_btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send reset email
        </Button>
        <FormLabel className='login_prompt'>
          Don't have an account? 
        </FormLabel>
        <Button className='login_link' onClick={(e) => {
          e.preventDefault()
          setreset(false)
          setlogin(false)
        }}>
            <Box className='login_link'>Register</Box>
          </Button>
      </div>
      </ThemeProvider>
    </div>
  );
}
export default Reset;