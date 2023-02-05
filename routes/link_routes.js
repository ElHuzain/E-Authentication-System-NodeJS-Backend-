const express = require('express');
const LinkController = require('../controllers/link_controller.js')
const router = express.Router();

// Complete

// Returns all links (Needs more security)
// Request comes from a USER using the mobile application
// {accountId}
router.get('/link', LinkController.RetrieveLinks)

// Makes a new link
// Request comes from a WEBSERVER requesting a new link
// {websiteName, accountId, email, secret(websites)}
router.post('/link', LinkController.CreateLink)

// Incomplete

module.exports = router;