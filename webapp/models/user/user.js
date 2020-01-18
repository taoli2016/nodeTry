var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName:{
        type:String,
        unique:true,
        require:true,
    },
    passWord:{
        type:String,
        require:true,
    },
    age:Number,
    address:String,
    authority:{
        type:Number,
        default:0,
    },
    createTime:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('webusers',userSchema)
