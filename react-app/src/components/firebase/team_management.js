import { db } from "./firebase";
// import firebase from 'firebase';
import axios from 'axios';
import sports from './team_names';

const sportingMarkets = ['american_football.moneyline', 'basketball.moneyline', 'baseball.moneyline', 'tennis.moneyline', 'soccer.match_odds', 'ice_hockey.period_1x2', 'golf', 'boxing.moneyline', 'mma.moneyline']

const sportingNames = ['american-football', 'basketball', 'baseball', 'tennis', 'soccer', 'ice-hockey', 'golf', 'boxing', 'mma']

const sportingLeagues = [
  ['american-football-usa-ncaa', 'american-football-usa-nfl'], 
  ['basketball-usa-ncaa', 'basketball-usa-nba'], 
  ['baseball-usa-mlb'], 
  ['tennis-atp-french-open-men-singles',	'tennis-atp-us-open-men-singles',	'tennis-atp-wimbledon-men-s-singles',	'tennis-atp-australian-open-men-singles-qual'], 
  ['soccer-usa-major-league-soccer',	'soccer-germany-bundesliga',	'soccer-italy-serie-a',	'soccer-france-ligue-1',	'soccer-england-premier-league',	'soccer-spain-laliga'],
  ['ice-hockey-usa-nhl'],
  ['golf-men-t6c71-us-masters-2022',	'golf-international-pga-tour-zozo-championship'],
  ['boxing-international-matchups'],
  ['mma-international-ufc']
]


async function addTeam(user, team, liked, edit) {
  console.log(user)
  if (liked) {
    try {
        await db
          .collection("users")
          .doc(user.uid)
          .collection("likedTeams")
          .doc(team.teamname)
          .set({
            teamname: team.teamname,
            rating: team.rating,
            league: team.league,
            sport: team.sport
          });
      if (edit) {
        await db
          .collection("users")
          .doc(user.uid)
          .collection("hatedTeams")
          .doc(team.teamname)
          .delete()
      }
    } catch (err) {
      console.error(err);
      alert('this is an error' + err.message);
    }
  } else {
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("hatedTeams")
        .doc(team.teamname)
        .set({
          teamname: team.teamname,
          rating: team.rating,
          league: team.league,
          sport: team.sport
        });
    if (edit) {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("likedTeams")
        .doc(team.teamname)
        .delete()
    }
  } catch (err) {
    console.error(err);
    alert('this is an error' + err.message);
  }
  }
};

async function addAllTeams() {
  let fromDate = Math.floor(new Date().getTime() / 1000)
  let toDate = fromDate + (604800 * 3)
  fromDate = fromDate.toString()
  toDate = toDate.toString()
  for(let i=0; i<sportingMarkets.length; i++) {
    for(let j=0; j<sportingLeagues[i].length; j++) {
      axios({
        method: 'get',
        url: `https://sports-api.cloudbet.com/pub/v2/odds/competitions/${sportingLeagues[i][j]}?from=${fromDate}&limit=500&to=${toDate}&markets=${sportingMarkets[i]}`,
        headers: {
          'X-Api-Key': process.env.REACT_APP_CLOUDBET_API_KEY
        }
      }).then(res => {
        let allteams = [];
        let events = res.data.events
        events.forEach(event => {
          if (event.home !== null) {
            let hometeam = {
              team: event.home.name,
              team_key: event.home.key,
              sport: sportingNames[i],
              league: sportingLeagues[i][j],
            }
            let awayteam = {
              team: event.away.name,
              team_key: event.away.key,
              sport: sportingNames[i],
              league: sportingLeagues[i][j],
            }
            allteams.push(hometeam)
            allteams.push(awayteam)
          }
        })
        allteams.forEach(team => {
          db
          .collection("sports")
          .doc(team.sport)
          .collection(team.league)
          .doc(team.team)
          .get()
          .then(querysnapshot => {
            if (!querysnapshot.data()) {
              db
              .collection("sports")
              .doc(team.sport)
              .collection(team.league)
              .doc(team.team)
              .set({
                name: team.team,
                key: team.team_key,
            });
          }
        })
      })
    })
  }
}
}

function runItUp(teamnames) {
  let oldstring = ''
  teamnames.forEach(team => {
      const newstring = oldstring + `{teamname: '${team.name}', key: '${team.key}'}, `
      console.log(newstring)
      oldstring = newstring
  });
  return oldstring
}


function getTeamNames(sport, league) {
  let arr = []
  const subarr = sports[sport][league]
  if (subarr.length > 0) {
    subarr.forEach(doc => arr.push(doc.teamname))
  }
  return arr
}

const fetchLikedTeams = async (user) => {
  try {
    let arr;
    const query = await db
      .collection("users")
      .doc(user?.uid)
      .collection("likedTeams")
      .get();
    if (query.size > 0) {
      arr = query.docs.map(document => { return { 
        teamname: document.data().teamname, 
        rating: document.data().rating,
        sport: document.data().sport,
        league: document.data().league
      }})
    } else {
      arr = []
    }
    return await fetchTeamObjects(arr) 
  } catch (err) {
    console.error(err);
    console.log("An error occured while fetching liked teams array");
  }
}

const fetchHatedTeams = async (user) => {
  try {
    let arr;
    const query = await db
      .collection("users")
      .doc(user?.uid)
      .collection("hatedTeams")
      .get();
      if (query.size > 0) {
        arr = query.docs.map(document => { return { 
          teamname: document.data().teamname, 
          rating: document.data().rating,
          sport: document.data().sport,
          league: document.data().league
        }})
      } else {
        arr = []
      }
      return await fetchTeamObjects(arr) 
  } catch (err) {
    console.error(err);
    console.log("An error occured while fetching hated teams array");
  }
}

const fetchTeamObjects = async (teams) => {
  const teamsArr = []
  await teams.forEach(team => {
    db
    .collection("sports")
    .doc(team.sport)
    .collection(team.league)
    .doc(team.teamname)
    .get()
    .then(snapshot => {
      let newObj = snapshot.data()
      newObj.rating = team.rating
      teamsArr.push(newObj)
    })
  })
  return teamsArr
} 

const fetchUserData = async (user) => {
  try {
    let obj;
    await db
      .collection("users")
      .doc(user?.uid)
      .get()
      .then(snapshot => {
        obj = {
          username: snapshot.data().name,
          email: snapshot.data().email,
          uid: snapshot.data().uid,
        }
      })
    return {...obj, likedTeams: await fetchLikedTeams(user), hatedTeams: await fetchHatedTeams(user)}
  } catch (err) {
    console.error(err);
    console.log("An error occured while fetching user data");
    return {
      username: 'dummyname',
      email: 'dummyemail',
      uid: 'dummyid',
      likedTeams: [],
      hatedTeams: []
    }
  }
}





async function updateEvents() {
  let fromDate = Math.floor(new Date().getTime() / 1000)
  let toDate = fromDate + (604800 * 2)
  let allteams = [];
  fromDate = fromDate.toString()
  toDate = toDate.toString()
  for(let i=0; i<sportingMarkets.length; i++) {
    for(let j=0; j<sportingLeagues[i].length; j++) {
      axios({
        method: 'get',
        url: `https://sports-api.cloudbet.com/pub/v2/odds/competitions/${sportingLeagues[i][j]}?from=${fromDate}&limit=500&to=${toDate}&markets=${sportingMarkets[i]}`,
        headers: {
          'X-Api-Key': process.env.REACT_APP_CLOUDBET_API_KEY
        }
      }).then(res => {
        let events = res.data.events
        events.forEach(event => {
          if (event.home !== null) {
            if(Object.keys(event.markets).length > 0) {
              let markets = event.markets[sportingMarkets[i]]
              let selectIndex = 0
              if (sportingNames[i] === 'ice-hockey') {
                selectIndex = 2
              }
              let submarket = markets[Object.keys(markets)[0]]
              let selections = submarket[Object.keys(submarket)[selectIndex]]
              if (selections) {
                let data = selections.selections
                let homeindex = 0
                let awayindex = 1
                if (sportingNames[i] === 'soccer' || sportingNames[i] === 'ice-hockey') {
                  awayindex = 2
                }
                let expirationDate = +fromDate + 86400;
                let hometeam = {
                  id: event.id,
                  team: event.home.name,
                  team_key: event.home.key,
                  opponent: event.away.name,
                  winProbability: data[homeindex].probability,
                  lossProbabliity: data[awayindex].probability,
                  home: true,
                  sport: sportingNames[i],
                  league: sportingLeagues[i][j],
                  expires: expirationDate
                }
                let awayteam = {
                  id: event.id,
                  team: event.away.name,
                  team_key: event.away.key,
                  opponent: event.home.name,
                  winProbability: data[awayindex].probability,
                  lossProbabliity: data[homeindex].probability,
                  home: false,
                  sport: sportingNames[i],
                  league: sportingLeagues[i][j],
                  expires: expirationDate
                }
                allteams.push(hometeam)
                allteams.push(awayteam)
              }
            }
          }
        })
        for(let i=allteams.length-1; i >= 0; i--) {
          db
          .collection("sports")
          .doc(allteams[i].sport)
          .collection(allteams[i].league)
          .doc(allteams[i].team)
          .get()
          .then(querysnapshot => {
            if (querysnapshot.data()) {
              db
              .collection("sports")
              .doc(allteams[i].sport)
              .collection(allteams[i].league)
              .doc(allteams[i].team)
              .update({
                nextEvent: allteams[i]
              });
            } else {
              db
              .collection("sports")
              .doc(allteams[i].sport)
              .collection(allteams[i].league)
              .doc(allteams[i].team)
              .set({
                name: allteams[i].team,
                key: allteams[i].team_key,
                nextEvent: allteams[i]
              });
            }
          })
        }
    })
    }
  }
  console.log('events have been updated for all teams')
}



export {
    addTeam,
    addAllTeams,
    getTeamNames,
    runItUp,
    fetchUserData,
    fetchLikedTeams,
    fetchHatedTeams,
    updateEvents,
}
