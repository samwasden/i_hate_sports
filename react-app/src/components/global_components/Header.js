import React, {useState} from 'react'
import Dashboard from './Dashboard'
import './global_stylesheets/Header.css'
import { ThemeProvider } from '@emotion/react'
import {Theme} from './Theme'
import { Button, ButtonGroup, Box } from '@mui/material'


export default function Header(props) {
    const [dashboard, setdashboard] = useState(false)

    const {user, setpage} = props

    return (
        <div className='header'>
            <div className='header_title'>
                <ThemeProvider theme={Theme}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={() => setpage({homepage: true, myteams: false, browseteams: false})}>
                                <Box className='nav_button' id='page_title'>
                                    Sports Suck
                                </Box>
                            </Button>
                        </ButtonGroup>
                </ThemeProvider>
            </div>
            <div className='header_panel' id='nav_panel'>
                <div id='navbar'>
                    <ThemeProvider theme={Theme}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={() => setpage({homepage: true, myteams: false, browseteams: false})}>
                                <Box className='nav_button'>
                                    dashboard
                                </Box>
                            </Button>
                            <Button onClick={() => setpage({homepage: false, myteams: true, browseteams: false})}>                                                  
                                <Box className='nav_button'>
                                    my teams
                                </Box>
                            </Button>
                            <Button onClick={() => setpage({homepage: false, myteams: false, browseteams: true})}>
                                <Box className='nav_button'>
                                    browse teams
                                </Box>
                            </Button>
                        </ButtonGroup>
                    </ThemeProvider>

                </div>
            </div>
            <div className='header_panel' id='account_panel'>
                {dashboard ? <Dashboard user={user} /> : null}
                <ThemeProvider theme={Theme}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={() => setdashboard(!dashboard)} >
                                <Box className='nav_button' id='account_button'>
                                    {dashboard ? 'close' : 'account'}
                                </Box>
                            </Button>
                        </ButtonGroup>
                </ThemeProvider>
            </div>
        </div>
    )
}
