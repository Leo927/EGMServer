const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'maps';

// insert a map
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

// get get a map by its id
async function getMap(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({'_id':new ObjectId(id)}).toArray();
}

// get all public maps
async function getMaps() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

// get all public map listings. 
// returns less information than getMaps. Trying to save data transfer. 
async function getMapListing(){
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).project({name:1, uid:1}).toArray();
}

// delete a map by id
async function deleteMap(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

// get all maps belonging to a user
async function getUserMaps(uid){
  const database = await getDatabase();
  return await database.collection(collectionName).find({uid}).project({name:1, uid:1}).toArray();
}

// update a map. 
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
  getMapListing
};