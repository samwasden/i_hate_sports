import React from 'react'
import { Radio, FormControl, FormControlLabel, RadioGroup, FormLabel, Rating } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import './browseteams_stylesheets/MaterialUI.css';


export default function AddTeam({form, setform}) {

    return (
        <div className='team_form'>
            <FormControl component="fieldset">
            <FormLabel sx={{color: 'white', fontSize: '2rem', padding: '0 0 30px 0'}}>{form.teamname}</FormLabel>
                <RadioGroup value={form.value} name="radio-buttons-group" >
                    <FormControlLabel value={true} control={<Radio />} label="I like this team" onClick={(e) => setform({...form, liked: true})} />
                    <FormControlLabel value={false} control={<Radio />} label="I don't like this team" onClick={(e) => setform({...form, liked: false})} />
                </RadioGroup>
            <FormLabel sx={{color: 'white', padding: '20px'}}>How much do you {form.liked ? 'like' : 'dislike'} this team?</FormLabel>  
            <Rating
                name="customized-color"
                value={form.rating}
                precision={1}
                icon={form.liked ? <ThumbUpAltIcon fontSize="inherit" /> : <ThumbDownAltIcon fontSize="inherit" />}
                emptyIcon={form.liked ? <ThumbUpOffAltIcon fontSize="inherit" /> : <ThumbDownOffAltIcon fontSize="inherit" />}                onChange={(event, newValue) => {
                    setform({...form, rating: {newValue}});
                    console.log(form)
                }}
                />
            </FormControl>
        </div>
    )
}
