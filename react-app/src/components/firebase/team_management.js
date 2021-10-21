import { db } from "./firebase";
import firebase from 'firebase';
import axios from 'axios';
import sports from './team_names';


async function addTeam(user, team, liked) {
  if (liked === true) {
    try {
        await db
          .collection("users")
          .doc(user.uid)
          .update({ likedTeams: firebase.firestore.FieldValue.arrayUnion(team) });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  } else {
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .update({ hatedTeams: firebase.firestore.FieldValue.arrayUnion(team) });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  }
};

async function addAllTeams() {
  const arr = []
  const namearr = []
    axios({
      method: 'get',
      url: 'https://sports-api.cloudbet.com/pub/v2/odds/competitions/tennis-atp-french-open-men-singles?from=1634611367&limit=500&to=1642560167&markets=[tennis.moneyline]',
      headers: {
        'X-Api-Key': process.env.CLOUDBET_API 
      }
    }).then(res => {
      const events = res.data.events
      for (let i=0; i<events.length; i++) {
        if (events[i].home) {
          if (!namearr.includes(events[i].home.name)) {
            namearr.push(events[i].home.name)
            arr.push({name: events[i].home.name, key: events[i].home.key})
          }
          if (!namearr.includes(events[i].away.name)) {
            namearr.push(events[i].away.name)
            arr.push({name: events[i].away.name, key: events[i].away.key})
          }
        }
      }
      console.log(namearr.sort())
      console.log(arr)

      for (let j=0; j<arr.length; j++) {
          db.collection("sports").doc("tennis").collection("tennis-atp-french-open-men-singles").doc(arr[j].name).set({
            name: arr[j].name,
            key: arr[j].key,
      });
    }
  })
};

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
  subarr.forEach(doc => arr.push(doc.teamname))
  return arr
}

async function fetchUserName(user) {
  try {
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then();

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

function fetchLikedTeams() {
  
}

function fetchHatedTeams() {
  
}

export {
    addTeam,
    addAllTeams,
    getTeamNames,
    runItUp,
    fetchUserName,
    fetchLikedTeams,
    fetchHatedTeams
}
