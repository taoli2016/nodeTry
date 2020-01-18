var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtSchema = new Schema({
    artTitle:{
        type:String,
        require:true,
    },
    artType:{
        type:String,
        default:'demo'
    },
    artContent:{
        type:String,
        default:''
    },
    artThumbUpNum:{
        type:Number,
        default:0
    },
    artConmmentsNum:{
        type:Number,
        default:0
    },
    createTime:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('webArt',ArtSchema)
