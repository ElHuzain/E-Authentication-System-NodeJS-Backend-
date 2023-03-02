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
// {websiteId, accountId, email, secret(websites)}
router.post('/link', LinkController.CreateLink)


// Valdiates an easyaccess login
// Request comes from a webserver validating code sent to them
// {email, websiteId, code}
router.get('/auth', LinkController.Authenticate);

module.exports = router;