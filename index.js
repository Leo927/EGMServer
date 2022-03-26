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
const mapRouter = require('./routers/maps');
const oauth2Router = require('./routers/oauth2');

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use('/maps', mapRouter);
app.use('/oauth2', oauth2Router);



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
  await insertMap({uid: 'test uid', name: 'test map name'})
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});