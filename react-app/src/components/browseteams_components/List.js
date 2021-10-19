import React from 'react'
import League from './League'

export default function List({names, sport, list, setform, form}) {

    return (
        <div className='list'>
            {names.map((leaguename, index) => {
                return <League key={index} sport={sport} leaguename={leaguename} league={list[index]} setform={setform} form={form}/> 
            })}
        </div>
    )
}
