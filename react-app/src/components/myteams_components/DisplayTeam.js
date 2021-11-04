import React, {useState, useEffect} from 'react'
import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import {Theme} from '../global_components/Theme'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function DisplayTeam({liked, team}) {

    // eslint-disable-next-line no-unused-vars
    const [date, setdate] = useState(Math.floor(new Date().getTime() / 1000))

    let winProbability
    let lossProbabliity
    let drawProbability

    if (team.nextEvent) {
        winProbability = Math.floor(team.nextEvent.winProbability * 100)
        lossProbabliity = Math.ceil(team.nextEvent.lossProbabliity * 100)
        drawProbability = 100 - (winProbability + lossProbabliity)
    }

    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        setloaded(true)
    }, [])

    return (
        <div className='my_teams'>
            <ThemeProvider theme={Theme}>
            <Box className='my_team_info'>
                <Box className='my_team_name'>
                    <Typography variant='button'>{team.name.toUpperCase()}</Typography>
                </Box>
                <Box className='my_team_rating'>
                    <Box>
                        {[...Array(+team.rating)].map((elem, index) => {
                            return liked ? <ThumbUpAltIcon key={index}/> : <ThumbDownAltIcon key={index}/>
                        })}
                    </Box>
                    <Typography sx={{color: '#D5D7E0'}} variant='button'>{team.rating}/5</Typography>
                </Box>
            </Box>
            {team.nextEvent && team.nextEvent.expires > date? 
            <Box className='my_team_event'>
                <Typography variant='button'>{team.nextEvent.home ? 'vs' : '@'} {team.nextEvent.opponent.toUpperCase()}</Typography>
                <Box className='odds_chart' style={loaded ? {width: '100%'} : {width: '0%'}}>
                    <div className='odds_meter' style={{width: `${winProbability}%`, background: '#5EDA8D'}}><p>{winProbability > 10 ? `${winProbability}%` : null}</p></div>
                    <div className='odds_meter' style={{width: `${lossProbabliity}%`, background: '#FF8042'}}><p>{lossProbabliity > 10 ? `${lossProbabliity}%` : null}</p></div>
                    {team.nextEvent.sport === 'soccer' || team.nextEvent.sport === 'ice-hockey' ? <div className='odds_meter' style={{width: `${drawProbability}%`, background: '#EED676'}}>
                        <p>{drawProbability > 10 ? `${drawProbability}%` : null}</p> 
                    </div> : null}
                </Box>
            </Box> : <Box className='my_team_event'>
                <Typography variant='button'>NO UPCOMING EVENT</Typography>
            </Box> }
            </ThemeProvider>
        </div>
    )
}
