const {MongoMemoryServer} = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const { ATLAS_MONGODB_ACCOUNT, ATLAS_MONGODB_PASSWORD } = require("../secret");

let database = null;
const URL = `mongodb+srv://${ATLAS_MONGODB_ACCOUNT}:${ATLAS_MONGODB_PASSWORD}@cluster0.xbqzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
async function startDatabase() {
  const connection = await MongoClient.connect(URL, {useNewUrlParser: true});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};