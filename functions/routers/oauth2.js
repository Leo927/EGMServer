/**
 * Handles authentication
 */

const express = require("express");
const github = require("../authentication/github");

const router = express.Router();

router.get('/exchange/github/:code', github.exchangeAccessToken);

router.post('/user/github', github.handleGetUser);

module.exports = router;