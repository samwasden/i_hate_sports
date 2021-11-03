import { Typography } from '@mui/material'
import React, { useState } from 'react'
import PieChartComponent from './PieChart'
import DashTeam from './DashTeam'
import { getData, getTeam, validEvent } from '../firebase/firebase'
// import { updateEvents } from '../firebase/team_management'

export default function Homepage({user, userloading}) {

    let resultData = getData(user)

    const [chart, setchart] = useState(true)
    const [chartteam, setchartteam] = useState({name: 'no team selected'})

    const [activeIndex, setactiveIndex] = useState(0)
    const [resultsactiveIndex, setresultsactiveIndex] = useState(0)



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
                                return <DashTeam key={index} team={team} chart={chart} setchart={setchart} setchartteam={setchartteam} chartteam={chartteam} setactiveindex={setactiveIndex}/>
                            })}
                        </div>
                        <div className='homepage_block' id='hated_panel'>
                            <div className='teams_panel_header'>
                                <Typography variant='h6'>DISLIKED TEAMS</Typography>
                            </div>
                            {user.hatedTeams.map((team, index) => {
                                return <DashTeam key={index} team={team} chart={chart} setchart={setchart} setchartteam={setchartteam} chartteam={chartteam} setactiveindex={setactiveIndex}/>
                            })}
                        </div>
                    </div>
                    <div className='homepage_block' id='charts_container'>
                        <div className='homepage_block' id='summary_panel'>

                        </div>
                        <div className='homepage_block' id='charts_panel'>
                            <div className='chart_box' id='team_chart_box'>
                                <Typography variant='button'>{chartteam.name}</Typography>
                                <Typography variant='body2'>{validEvent(chartteam) ? (chartteam.nextEvent.home ? 'vs ' : '@ ') + chartteam.nextEvent.opponent : 'no upcoming event.'}</Typography>
                                <PieChartComponent data={getTeam(chartteam)} innerRadius={50} outerRadius={75} activeIndex={activeIndex} setactiveIndex={setactiveIndex}/>
                            </div>
                            <div className='chart_box' id='results_chart_box'>
                                <Typography variant='button'>All Results</Typography>
                                <Typography variant='body2'>All liked and disliked teams</Typography>
                                <PieChartComponent data={resultData} innerRadius={50} outerRadius={75} activeIndex={resultsactiveIndex} setactiveIndex={setresultsactiveIndex}/>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null }
            </div>
        </div>
    )
}
