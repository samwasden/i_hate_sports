import React, { useState } from 'react'
import { Radio, FormControl, FormControlLabel, RadioGroup, Rating, Button, Box } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { addTeam } from '../firebase/team_management';

const labels = {
    0: 'No Feeling',
    1: 'Just A Bit',
    2: 'A Good Amount',
    3: 'Quite A Lot',
    4: 'Very Much',
    5: `It's Unhealthy`,
  };


export default function AddTeam({form, setform, user, liked, setliked}) {

    const [hover, setHover] = useState(-1);

    return (
        <div className='team_form' style={liked ? {backgroundColor: 'green'} : {backgroundColor: 'darkred'} }>
            <FormControl sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}} component="fieldset">
                <h1 className='form_title'>{form.teamname}</h1>
                    <RadioGroup value={liked} name="radio-buttons-group" >
                        <FormControlLabel value={true} control={<Radio />} label="I like this team" onClick={(e) => setliked(true)} />
                        <FormControlLabel value={false} control={<Radio />} label="I don't like this team" onClick={(e) => setliked(false)} />
                    </RadioGroup>
                <h4 className='form_label'>How much do you {liked ? 'like' : 'dislike'} this team?</h4>  
                <div className='rating_box'>
                <Rating
                    sx={{width: '40%'}}
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
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : form.rating]}</Box>
                    )}    
                    </div>
                <div className='button_box'>
                    <Button sx={{color: 'white', border: '2px solid white', marginTop: '10%', ':hover': {backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '2px solid white'}}} variant='outlined' onClick={() => {
                        setform(false)
                        setliked(true)
                    }}>cancel</Button>
                    <Button sx={{color: 'white', border: '2px solid white', marginTop: '10%', ':hover': {backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '2px solid white'}}} variant='outlined' onClick={() => {
                        addTeam(user, form, liked)
                        setform(false)
                        setliked(true)
                    }}>Submit</Button>
                </div>
            </FormControl>
        </div>
    )
}
