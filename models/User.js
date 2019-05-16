const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    passwd:{
        type:String,
        required:true
    }
});

module.exports = User = mongoose.model('User',UserSchema);