import React, { useState } from 'react';
import List from './List';
import './browseteams_stylesheets/MobileBrowseTeams.css'
import filledIcon from '../../content/icons/remove_icon_filled.png'
import outlineIcon from '../../content/icons/add_icon_outline.png'
import MobileAddTeam from './MobileAddTeam';
import { ThemeProvider } from '@emotion/react';
import {Theme} from '../global_components/Theme'
import { Button, Box } from '@mui/material';
import MobileAddTeamInfo from './MobileAddTeamInfo';


export default function MobileBrowseTeams({userdata, setuserdata, getUserData}) {


    const [likedTeams, setlikedTeams] = useState(userdata.likedTeams.map(team => team.name))
    const [hatedTeams, sethatedTeams] = useState(userdata.hatedTeams.map(team => team.name))
    const [allTeams, setallTeams] = useState([...likedTeams, ...hatedTeams])

    const [visable, setvisable] = useState({
        football: false,
        basketball: false,
        baseball: false,
        boxing: false,
        golf: false,
        hockey: false,
        mma: false,
        soccer: false,
        tennis: false
    })

    const [form, setform] = useState({
        valid: false,
        teamname: '',
        rating: 0,
        edit: false,
        sport: '',
        league: ''
    })

    const [liked, setliked] = useState(true);


    return (
        <div id='mobile_browseteams' className='page'>
            <div className='page_content' id='mobile_browse_teams_content'>
                {form.valid ? <MobileAddTeam setform={setform} form={form} user={userdata} setallTeams={setallTeams} setlikedTeams={setlikedTeams} sethatedTeams={sethatedTeams} liked={liked} setliked={setliked} getuserdata={getUserData} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : <MobileAddTeamInfo /> }
                <div className='mobile_browse_teams_container'>
                    <ThemeProvider theme={Theme}>
                    <Box id='mobile_all_teams_list'>
                    <Button className='mobile_listButton' onClick={() => setvisable({baseball: !visable.baseball})}><img className='mobile_button_image' src={visable.baseball ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Baseball</Box></Button>
                    {visable.baseball ? <List names={['MLB']} sport={'baseball'} list={['baseball-usa-mlb']} setform={setform} form={form} setliked={setliked} setuserdata={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({basketball: !visable.basketball})}><img className='mobile_button_image' src={visable.basketball ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Basketball</Box></Button>
                    {visable.basketball ? <List names={['NCAA Basketball', 'NBA']} sport={'basketball'} list={['basketball-usa-ncaa', 'basketball-usa-nba']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({boxing: !visable.boxing})}><img className='mobile_button_image' src={visable.boxing ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Boxing</Box></Button>
                    {visable.boxing ? <List names={['Boxing']} sport={'boxing'} list={['boxing-international-matchups']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({football: !visable.football})}><img className='mobile_button_image' src={visable.football ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Football</Box></Button>
                    {visable.football ? <List names={['NCAA Football', 'NFL']} sport={'american-football'} list={['american-football-usa-ncaa', 'american-football-usa-nfl']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({golf: !visable.golf})}><img className='mobile_button_image' src={visable.golf ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Golf</Box></Button>
                    {visable.golf ? <List names={['PGA', 'Masters']} sport={'golf'} list={['golf-international-pga-tour-zozo-championship', 'golf-men-t6c71-us-masters-2022']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({hockey: !visable.hockey})}><img className='mobile_button_image' src={visable.hockey ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Hockey</Box></Button>
                    {visable.hockey ? <List names={['NHL']} sport={'ice-hockey'} list={['ice-hockey-usa-nhl']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({mma: !visable.mma})}><img className='mobile_button_image' src={visable.mma ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>MMA</Box></Button>
                    {visable.mma ? <List names={['MMA']} sport={'mma'} list={['mma-international-ufc']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({soccer: !visable.soccer})}><img className='mobile_button_image' src={visable.soccer ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Soccer</Box></Button>
                    {visable.soccer ? <List names={['Premier League', 'Ligue 1', 'Bundesliga', 'Serie A', 'LaLiga', 'MLS']} sport={'soccer'} list={['soccer-england-premier-league', 'soccer-france-ligue-1', 'soccer-germany-bundesliga', 'soccer-italy-serie-a', 'soccer-spain-laliga', 'soccer-usa-major-league-soccer']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    <Button className='mobile_listButton' onClick={() => setvisable({tennis: !visable.tennis})}><img className='mobile_button_image' src={visable.tennis ? filledIcon : outlineIcon} alt='+' /><Box className='button_text'>Tennis</Box></Button>
                    {visable.tennis ? <List names={['Australian Open', 'French Open', 'US Open', 'Wimbledon']} sport={'tennis'} list={['tennis-atp-australian-open-men-singles-qual', 'tennis-atp-french-open-men-singles', 'tennis-atp-us-open-men-singles', 'tennis-atp-wimbledon-men-s-singles']} setform={setform} form={form} setliked={setliked} setuser={setuserdata} user={userdata} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> : null}
                    </Box>
                </ThemeProvider>
                </div>
            </div>
        </div>
    )
}
