import { Typography } from '@mui/material'
import React, { useState } from 'react'
import PieChartComponent from './PieChart'
import DashTeam from './DashTeam'
import { getData, getTeam, validEvent } from '../firebase/firebase'

export default function Homepage({user, userloading}) {

    let resultData = getData(user)

    const [chart, setchart] = useState(true)
    const [chartteam, setchartteam] = useState({name: 'no team selected'})

    const [activeIndex, setactiveIndex] = useState(3)
    const [resultsactiveIndex, setresultsactiveIndex] = useState(0)



    return (
        <div className='page'>
            <div className='page_content' >
                {!userloading ? (
                <div id='homepage_display'>
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
                            <Typography variant='h6'>DASHBOARD</Typography>
                            <div className='summary_description'>
                                <Typography sx={{color: '#D5D7E0'}} variant='body2'>This is your hompage, after you add teams in the 'browse teams' window they will apear here. At that point you can take a deeper look at upcoming events as well as see your overall prediction for all upcoming events. I hope sports suck a little less for you this week.</Typography>
                            </div>
                        </div>
                        <div className='homepage_block' id='charts_panel'>
                            <div className='main_chart_container'>  
                                <div className='chart_box' id='team_chart_box'>
                                    <Typography variant='button'>{chartteam.name}</Typography>
                                    <Typography variant='body2'>{chartteam.name !== 'no team selected' ? validEvent(chartteam) ? (chartteam.nextEvent.home ? 'vs ' : '@ ') + chartteam.nextEvent.opponent : 'no upcoming event.' : 'select a team to display data.'}</Typography>
                                    <PieChartComponent data={getTeam(chartteam)} innerRadius={50} outerRadius={75} activeIndex={activeIndex} setactiveIndex={setactiveIndex}/>
                                    <div className='chart_description'>
                                        <Typography sx={{color: '#D5D7E0'}} variant='body2'>You can click on any team and the predicted outcome of the next event is displayed here. If a team has no upcoming games in the sportsbook there will be no data and that team will not factor into the overall results.</Typography>
                                    </div>
                                </div>
                                <div className='chart_box' id='results_chart_box'>
                                    <Typography variant='button'>All Results</Typography>
                                    <Typography variant='body2'>All liked and disliked teams</Typography>
                                    <PieChartComponent data={resultData} innerRadius={50} outerRadius={75} activeIndex={resultsactiveIndex} setactiveIndex={setresultsactiveIndex}/>
                                    <div className='chart_description'>
                                        <Typography sx={{color: '#D5D7E0'}} variant='body2'>This shows the accumulated results of every upcoming event that your teams are involved in this weekend. Both liked and disliked teams are included and results are weighted by your level of interest in the team.</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null }
            </div>
        </div>
    )
}
