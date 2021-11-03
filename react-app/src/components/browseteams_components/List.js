import React from 'react'
import League from './League'

export default function List({names, sport, list, setform, form, setliked, getuserdata, user, likedTeams, hatedTeams, allTeams}) {



    return (
        <div className='list'>
            {names.map((leaguename, index) => {
                return <League key={index} sport={sport} leaguename={leaguename} league={list[index]} setform={setform} form={form} setliked={setliked} getuserdata={getuserdata} user={user} allTeams={allTeams} likedTeams={likedTeams} hatedTeams={hatedTeams}/> 
            })}
        </div>
    )
}
