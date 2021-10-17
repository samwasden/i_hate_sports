import React from "react";
import { logout } from "../firebase/firebase";
import './global_stylesheets/Dashboard.css'


function Dashboard({user}) {


  return (
    <div className='dashboard'>
      <div className="dashboard_container">
        <div>Hi {user?.displayName || 'User'}!</div>
        <div>{user?.email}</div>
        <button className="dashboard_btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;