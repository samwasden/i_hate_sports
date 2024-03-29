import { Typography } from '@mui/material'
import React, {useState} from 'react'
import Login from '../login_components/Login'
import Register from '../login_components/Register'
import Reset from '../login_components/Reset'
import './landing_stylsheets/Landing.css'

export default function Landing() {
    const [login, setlogin] = useState(true)
    const [reset, setreset] = useState(false)
    return (
        <div id='landing' className='page'>
            <div className='panel' id='information'>
                <div id='title_container'>
                    <Typography variant='h3'>SPORTS SUCK.</Typography>
                    <Typography variant='h6'>and we won't let you forget it.</Typography>
                </div>
            </div>
            {login ? (reset ? <Reset setlogin={setlogin} setreset={setreset} /> : <Login setlogin={setlogin} setreset={setreset} />) : <Register setlogin={setlogin}/>}
        </div>
    )
}
