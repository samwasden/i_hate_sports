import React, { useState } from 'react'
import { getTeamNames } from '../firebase/team_management'
import Teams from './Teams'
import filledIcon from '../../content/icons/remove_icon_filled.png'
import outlineIcon from '../../content/icons/add_icon_outline.png'
import { ThemeProvider } from '@emotion/react';
import {Theme} from '../global_components/Theme'
import { Button, Box } from '@mui/material';

export default function League({leaguename, sport, league, setform, setliked, getuserdata, user, likedTeams, hatedTeams, allTeams}) {

    const [teamnames, setteamnames] = useState([])

    const [visable, setvisable] = useState(false)

    return (
        <div className='league'>
            <ThemeProvider theme={Theme}>
            <Button className='listbutton' onClick={async () => {
                setteamnames(getTeamNames(sport, league))
                setvisable(!visable)
                }}><img className='button_image' src={visable ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>{leaguename}</Box></Button>
            {visable ? <Teams teamnames={teamnames} league={league} sport={sport} setform={setform} setliked={setliked} getuserdata={getuserdata} user={user} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
            </ThemeProvider>
        </div>
    )
}
