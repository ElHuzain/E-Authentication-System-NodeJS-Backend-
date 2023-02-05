const express = require('express');
const AccountController = require('../controllers/account_controller');
const router = express.Router();

// Complete

// Creates a new account
// Request comes from a USER creating a new account via mobile application
// {pin}
router.post('/register', AccountController.CreateAccount);

// Incomplete

// Recovers an account
// {accountId, pin, QR Code}
router.post('/recover');

module.exports = router;