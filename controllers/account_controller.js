const AccountModel = require('../models/account.js');
const Functions = require('../functions.js');
const CreateAccount = (req, res) => {
    
    // QR Code generation here..
    let pin = req.body.pin;

    if(!pin) {
        res.status(400).send("Invalid input.").end();
    } else {

        account = new AccountModel({
            id: Functions.generateId(),
            pin: pin
        });

        account.save().then((document) => {
            res.send({status: "ok", id: document.id});
        })
    }
}


// Route to register new users
// This route is called when a user creates a new account in the Authenticator application
// This request is expected to look like {pin}


module.exports = {CreateAccount};