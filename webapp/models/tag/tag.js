var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    tagName:{
        type:String,
        unique:true,
        require:true,
    },
    tagType:{
        type:String,
        default:'demo'
    },
    tagUrl:{
        type:String,
        default:'/public/images/tagImg/App.png',
    },
    tagStarsNum:{
        type:Number,
        default:0
    },
    tagArticlesNum:{
        type:Number,
        default:0
    },
    ifStar:{
        type:Boolean,
        default:false
    },
    createTime:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('webTags',tagSchema)
