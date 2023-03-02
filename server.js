// const express = require('express');
// const app = express();

// const {storeDocument, connect, getDatabase, encrypt} = require('./functions.js');
// const AccountModel = require('./models/account.js');
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// // Connect to MongoDB
// let db;
// connect(() => {
//     console.log("Connected.");

//     // Run the server only when DB is working.
//     app.listen(3030);
//     db = getDatabase();
// });

// app.post('/acc', (req, res) => {
//     let a = new AccountModel({
//         id: "123",
//         pin: "1234"
//     })

//     a.save().then((result) => console.log(result))
// })

// // Route to authenticate users
// // This route is called to verify authentication codes
// // This request is expected to look like {userid, website name, secret key}
// app.get('/auth', (req, res) => {
//     console.log(req.body.name);
//     db.collection('link').findOne({
//         platform: {name: req.body.name},
//         account: {id: req.body.userid}
//     }, (err, doc) => {
        
//         // No such link
//         if(!doc) {
//             res.send("No link with such data.").end();
//         }

//         // Link exists, verify
//         if(doc) {
//             let secret = encrypt(doc.key);
//             if(secret === req.body.secret) res.send("Ok").end(); // Key correct.
//             else res.send("No.").end(); // Key incorrect.
//         }

//     })

// });

// // Route to link an account
// // This route is called to link an external account to the authenticator
// // This request is expected to look like {userid, platform, email, key, snapshot}
// app.post('/link', (req, res) => {

//     db.collection('platform').findOne({name: req.body.platform}, (err, pt) => {
//         let secret = encrypt(pt.key);
//         console.log(secret);
//         if(secret === req.body.secret) {
//             db.collection('account').findOne({id: req.body.userid}, (err, usr) => {

//                 // Get link to see if it exists.
//                 db.collection('link').findOne({platform: pt, account: usr, email: req.body.email}, (err, link) => {

//                     // If link doesn't exist, create it.
//                     if(!link) {
//                         let key = Math.floor(Math.random() * 500);
//                         let doc = {
//                             email: req.body.email,
//                             key: key,
//                             platform: pt,
//                             account: usr
//                         }
//                         storeDocument(db, 'link', doc, ()=>{res.send("Ok.").end()})

//                     // Else if link exists, no.
//                     } else {
//                         res.send("No.").end();
//                     }

//                 })

//             })
//         } else res.send("Unauthorized access attempted.").end();
//     })

// });

// // Route to register new users
// // This route is called when a user creates a new account in the Authenticator application
// // This request is expected to look like {pin}
// app.post('/register', (req, res) => {

//     console.log(req.body);

//     // QR Code generation here..
//     let pin = req.body.pin;
//     if(!pin) {
//         res.status(400).send("Invalid input.").end();
//     } else {
//         storeDocument(db, "account", {"pin": pin}, (document) => {
//             console.log("Acc stored successfully.");
//             res.send({status: "ok", id: document.id}).end();
//         })
//     }
// });


// // Route to authorize account recovery
// // This route is called when account recovery is called
// app.post('/recover', (req, res) => {
    
// });

// // Route to get all linked accounts
// // This route is called when a user clicks the refresh button
// // This request is expected to look like {accountId}
// app.get('/links', async (req, res) => {
    
//     let accId = req.body.id;
//     if(!accId){
//         res.status(400).send("Invalid input.").end();
//     } else {
//        AccountModel.find().then((result) => {
//         res.send(result);
//        }).catch((err) => console.log(err))
//     }

// });