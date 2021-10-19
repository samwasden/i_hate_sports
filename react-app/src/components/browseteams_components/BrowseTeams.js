import React, { useEffect, useState } from 'react'
import Header from '../global_components/Header'
import Footer from '../global_components/Footer'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useHistory } from 'react-router';
import List from './List';
import './browseteams_stylesheets/BrowseTeams.css'
import filledIcon from '../../content/icons/remove_icon_filled.png'
import outlineIcon from '../../content/icons/add_icon_outline.png'
import AddTeam from './AddTeam';

export default function BrowseTeams() {

    const [user, loading] = useAuthState(auth);
    const history = useHistory();

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
        liked: true,
        rating: 0
    })
    
    useEffect(() => {
      if (loading) return;
      if (!user) return history.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div id='browseteams' className='page'>
            <Header user={user}/>
            <div className='page_content' id='browse_teams_content'>
                <div id='all_teams_list'>
                    <button className='listbutton' onClick={() => setvisable({baseball: !visable.baseball})}><img src={visable.baseball ? filledIcon : outlineIcon} alt='+' />Baseball</button>
                    {visable.baseball ? <List names={['MLB']} sport={'baseball'} list={['baseball-usa-mlb']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({basketball: !visable.basketball})}><img src={visable.basketball ? filledIcon : outlineIcon} alt='+' />Basketball</button>
                    {visable.basketball ? <List names={['NCAA Basketball', 'NBA']} sport={'basketball'} list={['basketball-usa-ncaa', 'basketball-usa-nba']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({boxing: !visable.boxing})}><img src={visable.boxing ? filledIcon : outlineIcon} alt='+' />Boxing</button>
                    {visable.boxing ? <List names={['Boxing']} sport={'boxing'} list={['boxing-international-matchups']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({football: !visable.football})}><img src={visable.football ? filledIcon : outlineIcon} alt='+' />Football</button>
                    {visable.football ? <List names={['NCAA Football', 'NFL']} sport={'american-football'} list={['american-football-usa-ncaa', 'american-football-usa-nfl']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({golf: !visable.golf})}><img src={visable.golf ? filledIcon : outlineIcon} alt='+' />Golf</button>
                    {visable.golf ? <List names={['PGA', 'Masters']} sport={'golf'} list={['golf-international-pga-tour-zozo-championship', 'golf-men-t6c71-us-masters-2022']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({hockey: !visable.hockey})}><img src={visable.hockey ? filledIcon : outlineIcon} alt='+' />Hockey</button>
                    {visable.hockey ? <List names={['NHL']} sport={'ice-hockey'} list={['ice-hockey-usa-nhl']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({mma: !visable.mma})}><img src={visable.mma ? filledIcon : outlineIcon} alt='+' />MMA</button>
                    {visable.mma ? <List names={['MMA']} sport={'mma'} list={['mma-international-ufc']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({soccer: !visable.soccer})}><img src={visable.soccer ? filledIcon : outlineIcon} alt='+' />Soccer</button>
                    {visable.soccer ? <List names={['Premier League', 'Ligue 1', 'Bundesliga', 'Serie A', 'LaLiga', 'MLS']} sport={'soccer'} list={['soccer-england-premier-league', 'soccer-france-ligue-1', 'soccer-germany-bundesliga', 'soccer-italy-serie-a', 'soccer-spain-laliga', 'soccer-usa-major-league-soccer']} setform={setform} form={form}/> : null}
                    <button className='listbutton' onClick={() => setvisable({tennis: !visable.tennis})}><img src={visable.tennis ? filledIcon : outlineIcon} alt='+' />Tennis</button>
                    {visable.tennis ? <List names={['Australian Open', 'French Open', 'US Open', 'Wimbledon']} sport={'tennis'} list={['tennis-atp-australian-open-men-singles-qual', 'tennis-atp-french-open-men-singles', 'tennis-atp-us-open-men-singles', 'tennis-atp-wimbledon-men-s-singles']} setform={setform} form={form}/> : null}
                </div>
                {form.valid ? <AddTeam setform={setform} form={form}/> : null }
            </div>
            <Footer />
        </div>
    )
}
