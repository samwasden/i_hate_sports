import React, {useState} from 'react'
import Login from '../login_components/Login'
import Register from '../login_components/Register'
import Reset from '../login_components/Reset'
import './landing_stylsheets/Landing.css'

export default function Landing() {
    const [login, setlogin] = useState(true)
    const [reset, setreset] = useState(false)
    return (
        <div className='landing'>
            <div className='panel' id='information'>

            </div>
            {login ? (reset ? <Reset setlogin={setlogin} setreset={setreset} /> : <Login setlogin={setlogin} setreset={setreset} />) : <Register setlogin={setlogin}/>}
        </div>
    )
}
