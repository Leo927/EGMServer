/**
 * Handles map related APIs
 * 
 * Author: Songhao Li
 */

const express = require("express");
const {insertMap, getMap, getMaps, updateMap
    ,getUserMaps} = require('../database/maps');
const { getUser } = require("../authentication/github");

const router = express.Router();

router.use((req, ress, next)=>{
    console.log("Time:", Date.now());
    next();
});

router.patch('/', async (req, res)=>{
    try{
        const {token, mapId, mapData} = req.body;
        const user = await getUser(token);
        const map = await getMap(mapId);
        if(user.uid != map.uid){
            res.sendStatus(400);
            return;
        }
        await updateMap(req.body.mapId, req.body.mapData);
        console.log(`Map updated. ${await getMap(mapId)}`);
        res.send({mapId});
    }
    catch(e){
        res.sendStatus(400);
        console.error(e);
    }
});

router.get('/owner/:uid', async(req,res)=>{
    try{
        const {uid} = req.params;
        const maps = await getUserMaps(uid);
        res.send(maps);
    }catch(e){
        res.sendStatus(400);
        console.error(e);
    }
})

router.post('/', async (req, res)=>{
    if(!req.body?.token){
        res.sendStatus(400);
        return;
    }
    getUser(req.body.token).then(async (user)=>{
        const mapId = await insertMap(req.body.mapData);
        console.log(`New map Created. id:${mapId}`);
        res.send({mapId});
    })        
    .catch((e)=>{
        console.log(e);
        res.sendStatus(400);
    })
});

router.get('/:mapId', async (req,res)=>{
    try{
        const {mapId} = req.params;
        const map = await getMap(mapId);
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

router.get('/', async (req, res) => {
    res.send(await getMaps());
});

module.exports = router;