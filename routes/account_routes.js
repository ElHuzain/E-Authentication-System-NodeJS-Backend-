const express = require('express');
const AccountController = require('../controllers/account_controller');
const router = express.Router();

// Complete

// Creates a new account
// Request comes from a USER creating a new account via mobile application
// {pin}
router.post('/register', AccountController.CreateAccount);

// Finds an account via its QRCode
// Request is made to either grant access to or find an account. (Based on where its used!)
// {code}
router.get('/findaccount', AccountController.findQrCode);

// Validates pin sent.
// {accountId(string), pin(string)}
router.post('/checkpin', AccountController.ValidatePin);

// Updates an account's lock status
// {lock(bool), accountId(string)}
router.post('/lock', AccountController.Lock);

// Checks if QR has been changed or not.
// {accountId(String), qrcode(String)}
router.post('/validate', AccountController.Validate);
// Incomplete

// Recovers an account
// {accountId, pin, QR Code}
router.post('/recover');

module.exports = router;