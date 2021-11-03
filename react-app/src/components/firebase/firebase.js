import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "sportssuck-f8d45.firebaseapp.com",
  projectId: "sportssuck-f8d45",
  storageBucket: "sportssuck-f8d45.appspot.com",
  messagingSenderId: "35385192686",
  appId: "1:35385192686:web:ff01bdadea69a67b60c3ff",
  measurementId: "G-JV8DRH27SZ"
};

const app = firebase.initializeApp(firebaseConfig);
const appAuth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await appAuth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await appAuth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await appAuth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email,                                                                                                       
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await appAuth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  appAuth.signOut();
};

const getData = (user) => {
  const date = new Date()
  const initArr = user.likedTeams.filter(team => team.nextEvent && team.nextEvent.expires < date.getTime())
  const hatedArr = user.hatedTeams.filter(team => team.nextEvent && team.nextEvent.expires < date.getTime())
  let totalWin = 0
  let totalLose = 0
  let totalDraw = 0
  let totalArr = [...initArr, ...hatedArr]
  if (totalArr.length > 0) {
    initArr.forEach(team => {
        totalWin += (+team.nextEvent.winProbability)
        totalLose += (+team.nextEvent.lossProbabliity)
        totalDraw += 1 - ((+team.nextEvent.winProbability + +team.nextEvent.lossProbabliity))
    })
    hatedArr.forEach(team => {
        totalWin += (+team.nextEvent.lossProbabliity)
        totalLose += (+team.nextEvent.winProbability)
        totalDraw += 1 - ((+team.nextEvent.winProbability + +team.nextEvent.lossProbabliity))
    })
    return [{name: 'Positive', value: totalWin}, {name: 'Negative', value: totalLose}, {name: 'Neutral', value: totalDraw}, {name: 'No Event', value: 0}]
  } else {
    return [{name: 'Positive', value: 0}, {name: 'Negative', value: 0}, {name: 'Neutral', value: 0}, {name: 'No Event', value: 100}]
  }
  
}

const getTeam = (team) => {
  if (validEvent(team)) {
    return [{name: 'Win', value: team.nextEvent.winProbability}, {name: 'Lose', value: team.nextEvent.lossProbabliity}, {name: 'Draw', value: 1 - (team.nextEvent.winProbability + team.nextEvent.lossProbabliity)}, {name: 'No Event', value: 0}]
  }
  else return [{name: 'Win', value: 0}, {name: 'Lose', value: 0}, {name: 'Draw', value: 0}, {name: 'No Event', value: 100}]
}

const validEvent = (team) => {
  let date = new Date()
  if (team.nextEvent) {
      if (team.nextEvent.expires > date.getTime() / 1000) {
          return true
      }
  }
  return false
}

export {
  appAuth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  getData,
  getTeam,
};