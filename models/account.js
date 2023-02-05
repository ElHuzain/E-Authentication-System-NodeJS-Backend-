const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    id: String,
    pin: String
}, {versionKey: false});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;