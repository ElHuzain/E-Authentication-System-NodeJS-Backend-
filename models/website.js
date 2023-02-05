const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    id: String,
    name: String,
    key: String
}, {versionKey: false});

const Website = mongoose.model('website', websiteSchema);

module.exports = Website;