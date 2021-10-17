import { db } from "./firebase";
import firebase from 'firebase'

async function addTeam(user, team) {
  try {
      await db
        .collection("users")
        .doc(user.uid)
        .update({ likedTeams: firebase.firestore.FieldValue.arrayUnion(team) });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
    addTeam
}