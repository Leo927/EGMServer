const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'maps';

async function insertMap(map) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(map);
  return insertedId;
}

async function getMap(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({'_id':id}).toArray();
}

async function getMaps() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteMap(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

async function updateMap(id, map) {
  const database = await getDatabase();
  delete map._id;
  await database.collection(collectionName).update(
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
  getMaps
};