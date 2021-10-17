import React, {useState} from 'react'
import Dashboard from './Dashboard'
import './global_stylesheets/Header.css'
import settings_icon from '../../content/icons/settings_icon.png'
import close_icon from '../../content/icons/close_icon.png'


export default function Header({user, header}) {
    const [dashboard, setdashboard] = useState(false)

    return (
        <div className='header'>
            <div className='header_panel' id='nav_panel'>
                <div id='navbar'>
                    <button className='nav_button'>
                        my teams
                    </button>
                    <button className='nav_button'>
                        schedule
                    </button>
                    <button className='nav_button'>
                        browse teams
                    </button>
                </div>
            </div>
            <div className='header_title'>
                <h1>sports suck.</h1>
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
