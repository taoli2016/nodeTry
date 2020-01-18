var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName:{
        type:String,
        unique:true
    },
    passWord:{
        type:String
    },
    age:Number,
    address:String,
    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('users',userSchema)
