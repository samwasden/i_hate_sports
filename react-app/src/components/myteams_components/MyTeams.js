import React from 'react';
import './myteams_stylesheets/MyTeams.css'
import DisplayTeam from './DisplayTeam';
import { Typography } from '@mui/material';
import {Theme} from '../global_components/Theme';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';


export default function MyTeams({userdata}) {

    return (
        <div id='myTeams' className='page'>
            <div className='page_content'>
                <div>
                    <ThemeProvider theme={Theme}>
                        <Box className='teams_box'>
                            <Box id='liked_teams' className='team_list'>
                                <Box className='teams_header'>
                                    <Box className='percentage_key'>
                                        <div className='color_key'>
                                            <div className='color_box' style={{background: '#82ca9d'}}></div>
                                            <Typography variant='body2'>WIN</Typography>
                                        </div>
                                        <div className='color_key'>
                                            <div className='color_box' style={{background: '#FFBB28'}}></div>
                                            <Typography variant='body2'>LOSE</Typography>
                                        </div>
                                        <div className='color_key'>
                                            <div className='color_box' style={{background: '#FF8042'}}></div>
                                            <Typography variant='body2'>DRAW</Typography>
                                        </div>
                                    </Box>
                                    <Typography variant='h6'>LIKED TEAMS</Typography>
                                </Box>
                                {userdata.likedTeams.map((teams, index) => {
                                    return <DisplayTeam liked={true} team={teams} key={index} />
                                })}
                            </Box>
                            <Box id='hated_teams' className='team_list'>
                                <Box className='teams_header'>
                                    <Box className='percentage_key'>
                                        <div className='color_key'>
                                            <div className='color_box' style={{background: '#82ca9d'}}></div>
                                            <Typography variant='body2'>WIN</Typography>
                                        </div>
                                        <div className='color_key'>
                                            <div className='color_box' style={{background: '#FF8042'}}></div>
                                            <Typography variant='body2'>LOSE</Typography>
                                        </div>
                                        <div className='color_key'>
                                            <div className='color_box' style={{background: '#FFBB28'}}></div>
                                            <Typography variant='body2'>DRAW</Typography>
                                        </div>
                                    </Box>
                                    <Typography variant='h6'>DISLIKED TEAMS</Typography>
                                </Box>
                                {userdata.hatedTeams.length ? null : <Typography variant='button'>You can add more teams in the 'Browse Teams' window. After you add them there they will appear here with the information you provided as well as their next event.</Typography>}
                                {userdata.hatedTeams.map((teams, index) => {
                                    return <DisplayTeam liked={false} team={teams} key={index} />
                                })}
                            </Box>
                        </Box>
                        <Box className='teams_box'>

                        </Box>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}
