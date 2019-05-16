const mongoose = require('mongoose');
const MongoURI = 'mongodb://118.25.210.208:27017/express-demo';
const salt = 'hfaferh27}{6@^%269&%%$';

const db = mongoose.connect(MongoURI,{useNewUrlParser:true}).then(()=>{
    console.log('db is ready.');
});

module.exports = {
    db, salt
};