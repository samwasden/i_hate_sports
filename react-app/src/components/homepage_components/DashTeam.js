import React, {useState} from 'react'
import { Button, Typography } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { Theme } from '../global_components/Theme'
import { validEvent } from '../firebase/firebase'


export default function DashTeam({team, setchartteam, setchart, chart, chartteam, setactiveindex}) {

    const [teamdetails, setteamdetails] = useState(false)
    const date = new Date()

    const isMobile = () => {
        if (window.innerWidth >= 768) {
            return false
        }
        return true
    }


    return (
        <div className='dash_team_box'>
        <ThemeProvider theme={Theme}>
            <Button onMouseOver={() => setteamdetails(true)} onMouseOut={() => setteamdetails(false)} onClick={() => {
                if (isMobile()) {
                    window.scrollTo({
                        left: 0, 
                        top: 720, 
                        behavior: "smooth" 
                    })                          
                }
                setchartteam(team)
                if (validEvent(team)) {
                    setactiveindex(0)
                } else {
                    setactiveindex(3)
                }
            }
            }>{team.name}</Button>
            {teamdetails ? (
                <div className='dash_team_details'>
                    <Typography variant='caption'>
                        {team.nextEvent && team.nextEvent.expires > date.getTime() / 1000 ? (
                            team.nextEvent.home ? 'vs ' + team.nextEvent.opponent : '@ ' + team.nextEvent.opponent
                        ) : 'No upcoming events.'}
                    </Typography>
                </div>
            ) : null}
        </ThemeProvider>
        </div>
    )
}
