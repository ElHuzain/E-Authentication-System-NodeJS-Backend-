const express = require('express');
const LinkController = require('../controllers/link_controller.js')
const router = express.Router();
var path = require('path');

// Returns all links (Needs more security)
// Request comes from a USER using the mobile application
// {accountId}
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

router.get('/style.css', (req, res) => res.sendFile(path.resolve('./views/style.css')))
router.get('/main.svg', (req, res) => res.sendFile(path.resolve('./views/main.svg')))
router.get('/logo.svg', (req, res) => res.sendFile(path.resolve('./views/logo.svg')))
router.get('/contact.svg', (req, res) => res.sendFile(path.resolve('./views/contact.svg')))
router.get('/features.svg', (req, res) => res.sendFile(path.resolve('./views/features.svg')))
router.get('/script.js', (req, res) => res.sendFile(path.resolve('./views/script.js')))

module.exports = router;