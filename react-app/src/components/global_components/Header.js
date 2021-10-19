import React, {useState} from 'react'
import Dashboard from './Dashboard'
import './global_stylesheets/Header.css'
import settings_icon from '../../content/icons/settings_icon.png'
import close_icon from '../../content/icons/close_icon.png'
import { Link } from 'react-router-dom'


export default function Header({user}) {
    const [dashboard, setdashboard] = useState(false)

    return (
        <div className='header'>
            <div className='header_panel' id='nav_panel'>
                <div id='navbar'>
                    <Link to='/home' className='nav_button'>
                        dashboard
                    </Link>
                    <Link to='/myteams' className='nav_button'>
                        my teams
                    </Link>
                    <Link to='/browseteams' className='nav_button'>
                        browse teams
                    </Link>
                </div>
            </div>
            <div className='header_title'>
                <Link to='/home' className='header_name'>sports suck.</Link>
            </div>
            <div className='header_panel' id='account_panel'>
                <button id={dashboard ? 'close_button' : 'settings_button'} onClick={() => setdashboard(!dashboard)}>
                    {dashboard ? null : 'account'}
                    {dashboard ? <img id='close_icon' src={close_icon} alt='close' /> : <img id='settings_icon' src={settings_icon} alt='settings' />}
                </button>
                {dashboard ? <Dashboard user={user} /> : null}
            </div>
        </div>
    )
}
