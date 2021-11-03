import React, {useState} from 'react'
import { Button, Typography } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { Theme } from '../global_components/Theme'

export default function DashTeam({team, setchartteam, setchart, chart}) {

    const [teamdetails, setteamdetails] = useState(false)
    const date = new Date()

    return (
        <div className='dash_team_box'>
        <ThemeProvider theme={Theme}>
            <Button onMouseOver={() => setteamdetails(true)} onMouseOut={() => setteamdetails(false)} onClick={() => {
                setchartteam(team.name)
                setchart(!chart)}
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
