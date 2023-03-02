const LinkModel = require('../models/link');
const Functions = require("../functions.js");

const auth = (req, res) => {
    LinkModel.findOne({email: req.body.email, websiteName: req.body.websiteName}).then((link) => {
        
        let secret = Functions.encrypt(link.key);
        console.log(secret);
        if(secret == req.body.accessCode) {
            res.send("ok.").end();
        } else {
            res.send("no.").end();
        }
    });
}

module.exports = {auth}