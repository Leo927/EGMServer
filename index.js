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
const {insertMap} = require('./database/maps');
const mapRouter = require('./routers/maps');
const oauth2Router = require('./routers/oauth2');
const loadDummyData = require('./database/dummydata');

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));
app.use('/maps', mapRouter);
app.use('/oauth2', oauth2Router);

startDatabase().then(async () => {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});