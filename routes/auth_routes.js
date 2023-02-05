const express = require('express');
const AuthController = require('../controllers/auth_controller');
const router = express.Router();

// Complete

// Verifies Access Code
// Request comes from a WEBSERVER verifying the user.
// {email, websiteName, accessCode}
router.post('/auth', AuthController.auth)

module.exports = router;