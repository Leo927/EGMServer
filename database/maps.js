const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'maps';

async function insertMap(map) {
  if(!map)
  {
    throw "Invalid mapData provided";
  }
  if(!map.name){
    throw "Invalid mapData. No name provided.";
  }
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(map);
  return insertedId;
}

async function getMap(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({'_id':new ObjectId(id)}).toArray();
}

async function getMaps() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteMap(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

async function getUserMaps(uid){
  const database = await getDatabase();
  return await database.collection(collectionName).find({uid}).toArray();
}

async function updateMap(id, map) {
  const database = await getDatabase();
  delete map._id;
  await database.collection(collectionName).updateOne(
    { _id: new ObjectId(id), },
    {
      $set: {
        ...map,
      },
    },
  );
}

module.exports = {
  insertMap,
  getMap,
  deleteMap,
  updateMap,
  getMaps,
  getUserMaps,
};