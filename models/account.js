const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    id: String,
    pin: String,
    qrcode: String,
    isLocked: Boolean
}, {versionKey: false});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;