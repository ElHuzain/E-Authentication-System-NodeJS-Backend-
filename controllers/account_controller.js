const AccountModel = require('../models/account.js');
const Functions = require('../functions.js');
const QRCode = require('qrcode');

const CreateAccount = async (req, res) => {

    // Validate request
    if (!req.body.pin) return res.send({ status: "no", error: "Invalid Input." }).end();

    // Definitions & Generations
    let pin = req.body.pin;
    let num = Functions.generateRandomNumbers(6);
    let accountId = await Functions.generateId();
    let qrId = `${accountId}${num}`

    QRCode.toDataURL(`http://192.168.1.6/recover?code=${qrId}`, function (err, url) {

        // Create new account
        account = new AccountModel({
            id: accountId,
            pin: pin,
            qrcode: qrId,
            isLocked: true
        });

        // Store account
        account.save().then((document) => {
            res.send({ status: "ok", id: document.id, qrcode: qrId });
        })

    });
}

const findQrCode = async (req, res) => {
    // Validate request
    if (!req.query.code) res.send("Invalid input").end();

    let code = req.query.code;
    AccountModel.findOne({ qrcode: code }).then((doc, err) => {
        ;
        if (!doc) res.send({ 'status': 'no', 'error': 'Account not found' }).end();

        else if (doc.isLocked == true) res.send({ status: 'ok', acc: doc }).end();

        else if (doc.isLocked == false) {
            let num = Functions.generateRandomNumbers(6);
            let qrId = `${doc.id}${num}`
            AccountModel.findOneAndUpdate({ 'id': doc.id }, { $set: { 'qrcode': qrId } }, { new: true }).then((doc, err) => {
                res.send({ status: 'authenticate', acc: doc }).end();
            });
        }
    })
}

const Lock = async (req, res) => {

    if (req.body.lock == undefined || !req.body.accountId) return res.send("Invalid Input").end();

    let id = req.body.accountId;
    let isLocked = req.body.lock;

    AccountModel.findOne({ id: id }).then((doc, err) => {

        if (!doc) return res.send({ 'status': 'no', 'error': 'Account not found' }).end();
        AccountModel.findOneAndUpdate({ 'id': id }, { $set: { 'isLocked': isLocked } }, { new: true }).then((doc, err) => {
            res.send({ 'status': 'ok', 'doc': doc }).end();
        });


    })
}

const Validate = async (req, res) => {
    if (!req.body.accountId || !req.body.qrcode) return res.send("Invalid Input").end();

    let id = req.body.accountId;
    let code = req.body.qrcode;

    AccountModel.findOne({ id: id }).then((doc, err) => {
        if (!doc) return res.send({ 'status': 'no', 'error': 'Account not found' }).end();

        if (doc.qrcode != code) return res.send({ 'status': 'ok', 'action': 'logout' }).end();
        else return res.send({ 'status': 'ok', 'action': 'stay' });

    })
}

const ValidatePin = async (req, res) => {
    if (!req.body.accountId || !req.body.pin) return res.send("Invalid Input").end();

    let id = req.body.accountId;
    let pin = req.body.pin;

    AccountModel.findOne({ id: id }).then((doc, err) => {
        if (!doc) return res.send({ 'status': 'no', 'error': 'Account not found' }).end();
        if (pin == doc.pin) {
            let num = Functions.generateRandomNumbers(6);
            let qrId = `${doc.id}${num}`
            AccountModel.findOneAndUpdate({ 'id': doc.id }, { $set: { 'qrcode': qrId } }, { new: true }).then((doc, err) => {
                res.send({ status: 'authenticate', acc: doc }).end();
            });
        }
    })
}

module.exports = { CreateAccount, QRCode, findQrCode, Lock, Validate, ValidatePin };