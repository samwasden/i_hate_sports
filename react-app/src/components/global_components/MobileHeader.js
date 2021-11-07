import React from 'react'
import './global_stylesheets/MobileHeader.css'
import { ThemeProvider } from '@emotion/react'
import {Theme} from './Theme'
import { Button, ButtonGroup, Box } from '@mui/material'


export default function MobileHeader(props) {

    const {setpage} = props

    return (
        <div className='mobile_header'>
            <div className='mobile_header_title'>
                <ThemeProvider theme={Theme}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={() => setpage({homepage: true, myteams: false, browseteams: false})}>
                                <Box className='mobile_nav_button' id='mobile_page_title'>
                                    Sports Suck
                                </Box>
                            </Button>
                        </ButtonGroup>
                </ThemeProvider>
            </div>
            <div className='mobile_header_panel' id='mobile_nav_panel'>
                <div id='mobile_navbar'>
                    <ThemeProvider theme={Theme}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={() => setpage({homepage: true, myteams: false, browseteams: false})}>
                                <Box className='mobile_nav_button'>
                                    dashboard
                                </Box>
                            </Button>
                            <Button onClick={() => setpage({homepage: false, myteams: true, browseteams: false})}>                                                  
                                <Box className='mobile_nav_button'>
                                    my teams
                                </Box>
                            </Button>
                            <Button onClick={() => setpage({homepage: false, myteams: false, browseteams: true})}>
                                <Box className='mobile_nav_button'>
                                    browse teams
                                </Box>
                            </Button>
                        </ButtonGroup>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}
