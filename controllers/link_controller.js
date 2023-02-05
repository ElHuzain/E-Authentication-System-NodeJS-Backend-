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
            res.send({status: "ok", links: result}).end();
        });
    }
};


const CreateLink = (req, res) => {

    // Verify request is coming from a trusted source
    WebsiteModel.findOne({name: req.body.name}).then((w) => {
        // !! Verify request is coming from trusted source HERE

        // Check if accountId exists
        AccountModel.findOne({id: req.body.accountId}).then((account) => {
            if(!account){res.send({status: "no", error: "Account ID does not exist."}).end()}
            else {

                // Check if link already exists
                LinkModel.findOne({
                    websiteName: req.body.name,
                    accountId: req.body.accountId,
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
                            websiteName: req.body.name
                        });
                        
                        link.save().then((m) => {res.send(m).end()});
                    }
                })
            }
        })
    }) 
}

module.exports = {
    RetrieveLinks, CreateLink
}