import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PieChartComponent from './PieChart'
import DashTeam from './DashTeam'
import { getData, getTeam } from '../firebase/firebase'
// import { updateEvents } from '../firebase/team_management'

export default function Homepage({user, userloading}) {

    let resultData = getData(user)
    let teamData = []

    const [chart, setchart] = useState(false)
    const [chartteam, setchartteam] = useState(null)

    useEffect(() => {
        teamData = getTeam(chartteam)
    }, [chartteam])

    return (
        <div className='page'>
            <div className='page_content' >
                {!userloading ? (
                <div id='homepage_display'>
                    {/* <button onClick={() => updateEvents()}>Click</button> */}
                    <div className='homepage_block' id='teams_panel'>
                        <div className='homepage_block' id='liked_panel'>
                            <div className='teams_panel_header'>
                                <Typography variant='h6'>LIKED TEAMS</Typography>
                            </div>
                            {user.likedTeams.map((team, index) => {
                                return <DashTeam key={index} team={team}/>
                            })}
                        </div>
                        <div className='homepage_block' id='hated_panel'>
                            <div className='teams_panel_header'>
                                <Typography variant='h6'>DISLIKED TEAMS</Typography>
                            </div>
                            {user.hatedTeams.map((team, index) => {
                                return <DashTeam key={index} team={team} chart={chart} setchart={setchart} setchartteam={setchartteam}/>
                            })}
                        </div>
                    </div>
                    <div className='homepage_block' id='charts_panel'>
                        {chart ? <div className='chart_box'>
                            <Typography>Results</Typography>
                            <PieChartComponent data={teamData} innerRadius={50} outerRadius={75}/>
                        </div> : null }
                        <div className='chart_box'>
                            <Typography>Results</Typography>
                            <PieChartComponent data={resultData} innerRadius={50} outerRadius={75}/>
                        </div>
                    </div>
                    
                </div>
                ) : null }
            </div>
        </div>
    )
}
