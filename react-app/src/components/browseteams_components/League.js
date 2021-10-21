import React, { useState } from 'react'
import { getTeamNames } from '../firebase/team_management'
import Teams from './Teams'
import filledIcon from '../../content/icons/remove_icon_filled.png'
import outlineIcon from '../../content/icons/add_icon_outline.png'

export default function League({leaguename, sport, league, setform, setliked}) {

    const [teamnames, setteamnames] = useState([])

    const [visable, setvisable] = useState(false)

    return (
        <div className='league'>
            <button className='listbutton' onClick={async () => {
                setteamnames(getTeamNames(sport, league))
                setvisable(!visable)
                }}><img src={visable ? filledIcon : outlineIcon} alt='+' />{leaguename}</button>
            {visable ? <Teams teamnames={teamnames} setform={setform} setliked={setliked}/> : null}
        </div>
    )
}
