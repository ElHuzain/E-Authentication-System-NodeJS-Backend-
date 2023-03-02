const LinkModel = require('../models/link.js');
const WebsiteModel = require('../models/website.js');
const AccountModel = require('../models/account.js');
const Functions = require('../functions.js');

const RetrieveLinks = (req, res) => {
    let accId = req.query.id;

    if(!accId) {
        res.send("Invalid Input").end();
    } else {
        LinkModel.find({accountId: accId}).then((result) => {
            result.forEach(l => {

            })
            res.send({status: "ok", links: result}).end();
        });
    }
};

const Authenticate = (req, res) => {
    // Find link
    LinkModel.findOne({email: req.query.email, websiteId: req.query.websiteId}).then((link) => {
        if(!link) return res.send({status: "no", error: "Link Not Found."}).end();
        
        let secret = Functions.encrypt(link.key);
        
        if(secret == req.query.code) res.send({status: "authenticate"}).end();
        else res.send({status: "no", error: "Incorrect Code"}).end();
    })
    // Validate
}

const CreateLink = (req, res) => {

    // Verify request is coming from a trusted source
    WebsiteModel.findOne({id: req.body.websiteId}).then((w) => {
        if(!w) return res.send({status: "no", error: "Website Not Found"}).end();
        // !! Verify request is coming from trusted source HERE

        // Check if accountId exists
        AccountModel.findOne({id: req.body.accountId}).then((account) => {
            if(!account){res.send({status: "no", error: "Account ID does not exist."}).end()}
            else {
        
                // Check if link already exists
                LinkModel.findOne({
                    websiteId: req.body.websiteId,
                    email: req.body.email
                }).then((result) => {
                    if(result) {
                        // If link exists, resist.
                        res.send({status: "no", error: "Link already exists"}).end();
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
                        
                        link.save().then((m) => {res.send({status: "ok", account: m}).end()});
                    }
                })
            }
        })
    }) 
}

module.exports = {
    RetrieveLinks, CreateLink, Authenticate
}