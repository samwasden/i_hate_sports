import React from "react";
import { logout } from "../firebase/firebase";
import './global_stylesheets/Dashboard.css'
import { ThemeProvider } from '@emotion/react'
import {Theme} from './Theme'
import { Button, FormLabel } from '@mui/material'
// import { updateEvents } from '../firebase/team_management'


function Dashboard({user}) {


  return (
    <div className='dashboard'>
      <div className="dashboard_container">
        <ThemeProvider theme={Theme}>
        <FormLabel>Hi {user ? user.username : 'user'}!</FormLabel>
          <Button variant='contained' onClick={logout}>
            Logout
          </Button>
          {/* <Button variant='contained' onClick={() => updateEvents()}>Update</Button> */}
        </ThemeProvider>
      </div>
    </div>
  );
}
export default Dashboard;