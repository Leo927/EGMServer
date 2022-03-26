/**
 * Handles authentication
 */

const express = require("express");
const github = require("../authentication/github");

const router = express.Router();

router.get('/:provider/callback', github.handleCallback);

module.exports = router;