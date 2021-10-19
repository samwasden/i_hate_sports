import React from 'react'

export default function Teams(props) {

    const {setform, teamnames, form} = props

    return (
        <div>
            {teamnames.length > 1 ? <div className='teams'>
                {teamnames.map((teamname, index) => {
                    return <button onClick={() => setform({...form, valid: true, teamname: teamname})} className='listbutton' key={index}>{teamname}</button>
                })}
            </div> : <p>No Available Teams</p>} 
        </div>
    )
}
