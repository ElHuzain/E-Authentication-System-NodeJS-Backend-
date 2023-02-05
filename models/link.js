const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    id: String,
    email: String,
    key: String,
    accountId: String,
    websiteName: String
}, {versionKey: false});

const Link = mongoose.model('link', linkSchema);

module.exports = Link;