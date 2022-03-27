/**
 * Handles map related APIs
 * 
 * Author: Songhao Li
 */

const express = require("express");
const mapDb = require('../database/maps');
const { getUser } = require("../authentication/github");

const router = express.Router();

// pass route to next handler
router.use((req, ress, next)=>{
    console.log("Time:", Date.now());
    next();
});

// update an existing map
router.patch('/', async (req, res)=>{
    try{
        const {token, mapId, mapData} = req.body;
        const user = await getUser(token);
        const map = await mapDb.getMap(mapId);
        if(user.uid != map.uid){
            res.sendStatus(400);
            return;
        }
        await mapDb.updateMap(req.body.mapId, mapData);
        console.log(`Map updated. ${await mapDb.getMap(mapId)}`);
        res.send({mapId});
    }
    catch(e){
        res.sendStatus(400);
        console.error(e);
    }
});

// get map by user id
router.get('/owner/:uid', async(req,res)=>{
    try{
        const {uid} = req.params;
        const maps = await mapDb.getUserMaps(uid);
        res.send(maps);
    }catch(e){
        res.sendStatus(400);
        console.error(e);
    }
})

// insert a new map
router.post('/', async (req, res)=>{
    if(!req.body?.token){
        res.sendStatus(400);
        return;
    }
    try{
        const user = await getUser(req.body.token);
        if(!user)
        {
            res.sendStatus(403);
            return;
        }
        const mapData = {uid:user.id.toString(), ...req.body.mapData};
        if(mapData._id != undefined)
            delete mapData._id;
        const mapId = await mapDb.insertMap(mapData);
        console.log(`New map Created. id:${mapId}`);
        res.send({mapId});
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
});

// get map by mapId
router.get('/:mapId', async (req,res)=>{
    try{
        const {mapId} = req.params;
        const map = await mapDb.getMap(mapId);
        if(!map){
            res.send(404);
            return;
        }
        res.send(map);
    }
    catch(e){
        res.sendStatus(500);
        console.error(e);
    }
});

// get all maps
router.get('/', async (req, res) => {
    try{
        res.send(await mapDb.getMaps());
    }
    catch(e){
        res.sendStatus(500);
        console.error(e);
    }
});

// delete map by map id
router.delete('/', async (req, res)=>{
    try{
        const {token, mapId} = req.body;
        if(!token || !mapId){
            res.sendStatus(400);            
            return;
        }   
        const user = await getUser(token);
        const map = await mapDb.getMap(mapId);
        if(user.uid != map.uid){
            res.sendStatus(403);
            return;
        }
        res.send(await mapDb.deleteMap(mapId));
    }
    catch(e){
        res.sendStatus(500);
        console.error(e);
    }
});

module.exports = router;