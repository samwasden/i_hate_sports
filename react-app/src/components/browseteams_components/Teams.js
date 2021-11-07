import React from 'react'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { ThemeProvider } from '@emotion/react';
import {Theme} from '../global_components/Theme'
import { Button } from '@mui/material';
import { Box } from '@mui/system';

export default function Teams(props) {

    const {setform, teamnames, form, setliked, user, sport, league, likedTeams, hatedTeams, allTeams} = props

    const isMobile = () => {
        if (window.innerWidth >= 768) {
            return false
        }
        return true
    }

    return (
        <div>
            {teamnames.length > 1 ? <div className='teams'>
                {teamnames.map((teamname, index) => {
                    return (
                        <div className='team_name_box' key={index}>
                            <ThemeProvider theme={Theme}>
                            <Button onClick={() => {
                                if (likedTeams.includes(teamname)) {
                                    const index = user.likedTeams.findIndex(a => a.name === teamname)
                                    setform({
                                        ...form, 
                                        valid: true, 
                                        teamname: user.likedTeams[index].name, 
                                        rating: user.likedTeams[index].rating, 
                                        sport: sport,
                                        league: league,
                                        edit: true
                                    })
                                    setliked(true)
                                    if (isMobile()) {
                                        window.scrollTo({
                                            left: 0, 
                                            top: 0, 
                                            behavior: "smooth" 
                                        })                                    }
                                } else if (hatedTeams.includes(teamname)) {
                                    const index = user.hatedTeams.findIndex(a => a.name === teamname)
                                    setform({
                                        ...form, 
                                        valid: true, 
                                        teamname: user.hatedTeams[index].name, 
                                        rating: user.hatedTeams[index].rating, 
                                        sport: sport,
                                        league: league,
                                        edit: true
                                    })
                                    setliked(false)
                                    if (isMobile()) {
                                        window.scrollTo({
                                            left: 0, 
                                            top: 0, 
                                            behavior: "smooth" 
                                        })                                    }
                                } else {
                                    setform({
                                        ...form, 
                                        valid: true, 
                                        teamname: teamname, 
                                        rating: 0, 
                                        sport: sport,
                                        league: league, 
                                        edit: false})
                                    setliked(true)
                                    if (isMobile()) {
                                        window.scrollTo({
                                            left: 0, 
                                            top: 0, 
                                            behavior: "smooth" 
                                        })
                                    }
                                }
                            }} className='listbutton' >
                                <Box className='button_text'>{teamname}</Box>
                            </Button>
                            </ThemeProvider>
                            {allTeams.includes(teamname) ? likedTeams.includes(teamname) ? <ThumbUpOffAltIcon /> : <ThumbDownOffAltIcon /> : null}
                    </div>
                    )
                })}
            </div> : <p>No Available Teams</p>} 
        </div>
    )
}
