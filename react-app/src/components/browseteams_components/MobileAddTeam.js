import React, { useState } from 'react'
import { Radio, FormGroup, FormControlLabel, FormLabel, RadioGroup, Rating, Button, Box, Typography } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { addTeam } from '../firebase/team_management';
import {Theme} from "../global_components/Theme";
import { ThemeProvider } from "@emotion/react";

const labels = {
    0: 'No Feeling',
    1: 'Just A Bit',
    2: 'A Good Amount',
    3: 'Quite A Lot',
    4: 'Very Much',
    5: `It's Unhealthy`,
  };


export default function MobileAddTeam({form, setform, user, liked, setliked, getuserdata, setlikedTeams, sethatedTeams, setallTeams, likedTeams, hatedTeams, allTeams}) {

    const [hover, setHover] = useState(-1);
    // eslint-disable-next-line no-unused-vars
    const [teamsport, setteamsport] = useState(!['boxing', 'golf', 'mma', 'tennis'].includes(form.sport))

    return (
        <div className='mobile_team_form_box' >
            <ThemeProvider theme={Theme}>
            <FormGroup className='mobile_team_form' id={liked ? 'mobile_liked_team_form' : 'mobile_hated_team_form'} >
                <Typography variant='h4' className='mobile_form_title'>{form.teamname}</Typography>
                <div className='dividing_line'></div>
                    <RadioGroup value={liked} name="radio-buttons-group" >
                        <FormControlLabel value={true} control={<Radio />} label={teamsport ? "I like this team" : "I like this athlete"} onClick={() => setliked(true)} />
                        <FormControlLabel value={false} control={<Radio />} label={teamsport ? "I don't like this team" : "I don't like this athlete"} onClick={() => setliked(false)} />
                    </RadioGroup>
                <FormLabel className='mobile_form_label'>How much do you {liked ? 'like' : 'dislike'} this {teamsport ? 'team' : 'athlete'}?</FormLabel>  
                <Box className='mobile_rating_box'>
                <Rating
                    name="customized-color"
                    value={form.rating}
                    precision={1}
                    icon={liked ? <ThumbUpAltIcon fontSize="inherit" /> : <ThumbDownAltIcon fontSize="inherit" />}
                    emptyIcon={liked ? <ThumbUpOffAltIcon fontSize="inherit" /> : <ThumbDownOffAltIcon fontSize="inherit" />} 
                    onChange={(event, newValue) => {
                        setform({...form, rating: newValue});
                        console.log(form)
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    />
                    {form.rating !== null && (
                        <FormLabel htmlFor='customized-color' sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : form.rating]}</FormLabel>
                    )}    
                    </Box>
                <Box className='mobile_button_box'>
                    <Button 
                        className='mobile_form_buttons'
                        variant='contained' 
                        margin='normal'
                        onClick={() => {
                            setform(false)
                            setliked(true)
                    }}>cancel</Button>
                    <Button 
                        className='mobile_form_buttons'
                        id='mobile_submit_team_button'
                        variant='contained' 
                        onClick={() => {
                            addTeam(user, form, liked)
                            setform(false)
                            setliked(true)
                            getuserdata()
                            liked ? setlikedTeams([...likedTeams, form.teamname]) : sethatedTeams([...hatedTeams, form.teamname])
                            setallTeams([...likedTeams, ...hatedTeams, form.teamname])
                    }}>Submit</Button>
                </Box>
            </FormGroup>
            </ThemeProvider>
        </div>
    )
}
