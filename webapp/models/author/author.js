var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorsSchema = new Schema({
    authorName:{
        type:String,
        require:true,
    },
    articleNum:{
        type:Number,
        default:0
    },
    introduction:{
        type:String,
        default:'这个人很懒，没有任何介绍。'
    },
    articleList:{
        type:Array,
        default:[]
    },
    createTime:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('webAuthor',AuthorsSchema)
