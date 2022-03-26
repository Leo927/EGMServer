/**
 * index.js
 * Backend nodejs server for EasyGameMap Project
 * Author: Songhao Li
 */

//code example from https://www.honeybadger.io/blog/oauth-nodejs-javascript/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {startDatabase} = require('./database/mongo');
const github = require("./authentication/github");

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

app.get('/oauth2/:provider/callback', github.handleCallback);


// // endpoint to delete an ad
// app.delete('/:id', async (req, res) => {
//   await deleteAd(req.params.id);
//   res.send({ message: 'Ad removed.' });
// });

// // endpoint to update an ad
// app.put('/:id', async (req, res) => {
//   const updatedAd = req.body;
//   await updateAd(req.params.id, updatedAd);
//   res.send({ message: 'Ad updated.' });
// });

startDatabase().then(async () => {
  // await insertAd({title: 'Hello, now from the in-memory database!'});

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});