const express = require("express");
const {insertMap, getMap, getMaps} = require('../database/maps');

const router = express.Router();

router.use((req, ress, next)=>{
    console.log("Time:", Date.now());
    next();
});

router.post('/', async (req, res)=>{
    res.send("");
});

router.get('/:id', async (req,res)=>{
    res.send(getMap(req.params.id));
});

router.get('/', async (req, res) => {
    res.send(await getMaps());
});

module.exports = router;