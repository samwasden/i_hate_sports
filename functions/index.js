const functions = require("firebase-functions");

const express = require("express");
const path = require("path");

const app = express();

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../react-app/build", "index.html"));
});

app.use(express.static(path.resolve(__dirname, "../react-app/build")));

exports.app = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
