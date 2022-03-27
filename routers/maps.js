/**
 * Handles map related APIs
 * 
 * Author: Songhao Li
 */

const express = require("express");
const {insertMap, getMap, getMaps, updateMap} = require('../database/maps');
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
        await updateMap(req.body.mapId, req.body.mapData);
        console.log(`Map updated. ${await getMap(mapId)}`);
        res.send({mapId});
    }
    catch{
        res.sendStatus(400);
    }
});

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

router.get('/:id', async (req,res)=>{
    res.send(getMap(req.params.id));
});

router.get('/', async (req, res) => {
    res.send(await getMaps());
});

module.exports = router;