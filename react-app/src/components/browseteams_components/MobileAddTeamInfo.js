import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material'
import React from 'react'
import {Theme} from '../global_components/Theme'

export default function MobileAddTeamInfo() {
    return (
        <div className='mobile_team_form_box'>
            <div className='mobile_team_form' id='mobile_team_info_form'>
                <ThemeProvider theme={Theme}>
                    <Typography variant='body1' className='form_info'>{'Navigate to a team you have interest in (positive or negative) and select the team.'}</Typography>
                    <div className='dividing_line' id='info_dividing_line'></div>
                    <Typography variant='body2' className='form_info'>{'A form will apear here allowing you to declare your opinion on the team and the strength of that opinion. You can also change and remove this team from your list here.'}</Typography>
                </ThemeProvider>
            </div>
        </div>
    )
}
