const LinkModel = require('../models/link');
const Functions = require("../functions.js");

let database = [];

const auth = (req, res) => {

    const now = new Date();
    const ip = Functions.getIPAddress(req.ip);
    const os = Functions.getOperatingSystem(req.headers['user-agent']);
    const browser = Functions.getBrowser(req.headers['user-agent']);
    const currentTime = now.toLocaleTimeString();
    const currentDate = now.toLocaleDateString();

    let LoginAttempt = {
        userId: link.accountId,
        IPAddress: ip,
        OperatingSystem: os,
        Browser: browser,
        CurrentTime: currentTime,
        CurrentDate: currentDate
    };
    
    LinkModel.findOne({ email: req.body.email, websiteName: req.body.websiteName }).then((link) => {


        let secret = Functions.encrypt(link.key);
        console.log(database); 

        if (secret == req.body.accessCode) {
            LoginAttempt.message = "Successful Login Attempt!";
            res.send("ok.").end();
        } else {
            LoginAttempt.message = "Unsuccessful Login Attempt!";
            res.send("no.").end();
        }

        database.push(LoginAttempt);
    });
}

module.exports = { auth }