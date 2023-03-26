const LinkModel = require('../models/link.js');
const WebsiteModel = require('../models/website.js');
const AccountModel = require('../models/account.js');
const Functions = require('../functions.js');

const RetrieveLinks = (req, res) => {
    let accId = req.query.id;
    if (req.query.logs) {
        console.log(req.query.logs);
        let response = [];
        Logs.forEach(log => {
            if (log.userId == req.query.id) {
                response.push(log);
            }
        })
        console.log(response);
        console.log(Logs);
        return res.send({ status: "ok", logs: response }).end();
    } else if (!accId) {
        res.send("Invalid Input").end();
    } else {
        LinkModel.find({ accountId: accId }).then((result) => {
            result.forEach(l => {

            })
            res.send({ status: "ok", links: result }).end();
        });
    }
};

LoginAttempts = [];
BlockedIPAddresses = [];
Logs = [];

const Authenticate = (req, res) => {
    let IPAddress = req.query.IPAddress;
    let userAgent = req.query.userAgent;
    if (BlockedIPAddresses.includes(IPAddress)) return res.send({ status: "no", error: "You've tried 3 times. Try again in a minute." }).end();

    const now = new Date();
    const ip = Functions.getIPAddress(IPAddress);
    console.log(userAgent);
    let os = "Windows 11", browser = "Chrome";
    if (userAgent) {
        os = Functions.getOperatingSystem(userAgent);
        browser = Functions.getBrowser(userAgent);
    }
    const currentTime = now.toLocaleTimeString();
    const currentDate = now.toLocaleDateString();

    // Find link
    LinkModel.findOne({ email: req.query.email, websiteId: req.query.websiteId }).then((link) => {


        if (!link) {
            return res.send({ status: "no", error: "Link Not Found." }).end();
        }

        let LoginAttempt = {
            userId: link.accountId,
            IPAddress: ip,
            OperatingSystem: os,
            Browser: browser,
            CurrentTime: currentTime,
            CurrentDate: currentDate
        };

        let secret = Functions.encrypt(link.key);

        if (secret == req.query.code) {
            LoginAttempt.type = "Successful";
            Logs.push(LoginAttempt);
            res.send({ status: "authenticate" }).end();
        }
        else {
            let theOne = LoginAttempts.find(arr => arr.ip === IPAddress);
            if (theOne) {
                theOne.attempts++;
                if (theOne.attempts >= 3) {
                    LoginAttempts = [];
                    BlockedIPAddresses.push(IPAddress);
                    LoginAttempt.type = "Unsuccessful";
                    Logs.push(LoginAttempt);
                    setTimeout(() => {
                        BlockedIPAddresses.splice(BlockedIPAddresses.indexOf(IPAddress), 1)
                        LoginAttempts.splice(LoginAttempts.indexOf(theOne), 1);
                    }, 2000);
                    return res.send({ status: "no", error: "You've tried 3 times. Try again in a minute." }).end();
                }
            } else LoginAttempts.push({ ip: IPAddress, attempts: 1 })

            res.send({ status: "no", error: "Incorrect Code" }).end();
        }
    })
    // Validate
}

const CreateLink = (req, res) => {
    console.log("R");
    // Verify request is coming from a trusted source
    WebsiteModel.findOne({ id: req.body.websiteId }).then((w) => {
        if (!w) return res.send({ status: "no", error: "Website Not Found" }).end();
        // !! Verify request is coming from trusted source HERE

        // Check if accountId exists
        AccountModel.findOne({ id: req.body.accountId }).then((account) => {
            if (!account) { res.send({ status: "no", error: "Account ID does not exist." }).end() }
            else {

                // Check if link already exists
                LinkModel.findOne({
                    websiteId: req.body.websiteId,
                    email: req.body.email
                }).then((result) => {
                    if (result) {
                        // If link exists, resist.
                        res.send({ status: "no", error: "Link already exists" }).end();
                    } else {
                        // If link doesn't exist, create it.
                        let link = new LinkModel({
                            id: Functions.generateId(),
                            email: req.body.email,
                            key: Functions.generateKey(),
                            accountId: req.body.accountId,
                            websiteId: req.body.websiteId,
                            websiteName: w.name
                        });

                        link.save().then((m) => { res.send({ status: "ok", account: m }).end() });
                    }
                })
            }
        })
    })
}

module.exports = {
    RetrieveLinks, CreateLink, Authenticate
}