import { Typography } from '@mui/material'
import React, { useState } from 'react'
import PieChartComponent from './PieChart'
import DashTeam from './DashTeam'
import { getData, getTeam, validEvent } from '../firebase/firebase'
import './homepage_stylsheets/MobileHomepage.css'

export default function MobileHomepage({user, userloading}) {

    let resultData = getData(user)

    const [chart, setchart] = useState(true)
    const [chartteam, setchartteam] = useState({name: 'no team selected'})

    const [activeIndex, setactiveIndex] = useState(3)
    const [resultsactiveIndex, setresultsactiveIndex] = useState(0)



    return (
        <div className='page'>
            <div className='page_content' >
                {!userloading ? (
                <div id='mobile_homepage_display'>
                    <div className='mobile_homepage_block' id='mobile_charts_container'>
                        <div className='mobile_homepage_block' id='mobile_summary_panel'>
                            <Typography variant='h6'>DASHBOARD</Typography>
                            <div className='mobile_summary_description'>
                                <Typography sx={{color: '#D5D7E0'}} variant='body2'>This is your hompage, after you add teams in the 'browse teams' window they will apear here. At that point you can take a deeper look at upcoming events as well as see your overall prediction for all upcoming events.</Typography>
                            </div>
                        </div>
                        <div className='mobile_homepage_block' id='mobile_charts_panel'>
                            <div className='mobile_main_chart_container'>  
                                <div className='mobile_chart_box' id='mobile_team_chart_box'>
                                    <Typography variant='button'>{chartteam.name}</Typography>
                                    <Typography variant='body2'>{chartteam.name !== 'no team selected' ? validEvent(chartteam) ? (chartteam.nextEvent.home ? 'vs ' : '@ ') + chartteam.nextEvent.opponent : 'no upcoming event.' : 'select a team to display data.'}</Typography>
                                    <div className='mobile_pie_chart'>
                                        <PieChartComponent data={getTeam(chartteam)} innerRadius={40} outerRadius={65} activeIndex={activeIndex} setactiveIndex={setactiveIndex}/>
                                    </div>
                                    <div className='mobile_chart_description'>
                                        <Typography sx={{color: '#D5D7E0'}} variant='body2'>You can click on any team and the predicted outcome of the next event is displayed here. If a team has no upcoming games in the sportsbook there will be no data and that team will not factor into the overall results.</Typography>
                                    </div>
                                </div>
                                <div className='mobile_chart_box' id='mobile_results_chart_box'>
                                    <Typography variant='button'>All Results</Typography>
                                    <Typography variant='body2'>All liked and disliked teams</Typography>
                                    <div className='mobile_pie_chart'>
                                        <PieChartComponent height='500px' data={resultData} innerRadius={40} outerRadius={65} activeIndex={resultsactiveIndex} setactiveIndex={setresultsactiveIndex}/>
                                    </div>
                                    <div className='mobile_chart_description'>
                                        <Typography sx={{color: '#D5D7E0'}} variant='body2'>This shows the accumulated results of every upcoming event that your teams are involved in this weekend. Both liked and disliked teams are included and results are weighted by your level of interest in the team.</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mobile_homepage_block' id='mobile_teams_panel'>
                        <div className='mobile_homepage_block' id='mobile_liked_panel'>
                            <div className='mobile_teams_panel_header'>
                                <Typography variant='h6'>LIKED TEAMS</Typography>
                            </div>
                            {user.likedTeams.map((team, index) => {
                                return <DashTeam key={index} team={team} chart={chart} setchart={setchart} setchartteam={setchartteam} chartteam={chartteam} setactiveindex={setactiveIndex}/>
                            })}
                        </div>
                        <div className='mobile_homepage_block' id='mobile_hated_panel'>
                            <div className='mobile_teams_panel_header'>
                                <Typography variant='h6'>DISLIKED TEAMS</Typography>
                            </div>
                            {user.hatedTeams.map((team, index) => {
                                return <DashTeam key={index} team={team} chart={chart} setchart={setchart} setchartteam={setchartteam} chartteam={chartteam} setactiveindex={setactiveIndex}/>
                            })}
                        </div>
                    </div>
                </div>
                ) : null }
            </div>
        </div>
    )
}
