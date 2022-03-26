/**
 * Handles map related APIs
 * 
 * Author: Songhao Li
 */

const express = require("express");
const {insertMap, getMap, getMaps} = require('../database/maps');
const { getUser } = require("../authentication/github");

const router = express.Router();

router.use((req, ress, next)=>{
    console.log("Time:", Date.now());
    next();
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