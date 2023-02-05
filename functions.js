const { filter } = require('mathjs');
const mongoose = require('mongodb');

function encrypt(key){
    let d = new Date();

    let snapshot = parseInt(d.getMinutes(), 10);

    let result = 0;
    result = key*snapshot;
    result = result+key;
    result = result-snapshot;
    result = Math.round(result);
    return result;
}

function decrypt(key){

}

// Add a document to MongoDB.
function storeDocument(db, collection, document, cb){
    // 1- Create ID
    let d = new Date();
    let id = `${getMonth(d.getMonth())}${d.getDate()}${d.getFullYear()}${generateRandomNumbers(4)}`;

    // 2- check if there's a duplicate id
    db.collection(collection).findOne({id: id}, (err, m) => {

        // If there's a document with the given id, try again.
        if(m)  return storeDocument(db, collection, document, cb);

        // Else, store the document
        else {
            document.id = id;
            db.collection(collection).insertOne(document).then(cb(document));
        };
    })
}

function generateId(){
    let d = new Date();
    let id = `${getMonth(d.getMonth())}${d.getDate()}${d.getFullYear()}${generateRandomNumbers(4)}`;
    return id;
}

function generateKey(){return Math.floor(Math.random() * 500)};

function getMonth(month){
    if(month < 10) return `0${month+1}`;
    else return month+1;
}

function generateRandomNumbers(digits){
    let m = "";
    for(i = 0; i <= digits; i++){
        m += Math.floor(Math.random() * 9);
    }
    return m;
}

function findById(db, collection, id){
    let object = db.collection(collection).findOne({_id: ObjectId(id)});
    if(object) return object;
    else return null;
}

let dbConnection;

function connect(cb){
    mongoose.connect("mongodb://localhost:27017/auth")
    .then((client) => {
        dbConnection = client.db();
        return cb();
    })
    .catch((err) => {console.log(err)})
}

function getDatabase(){return dbConnection;}

module.exports = {storeDocument, connect, getDatabase, encrypt, generateId, generateKey}