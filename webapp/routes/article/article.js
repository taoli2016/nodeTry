var express = require('express')
var router = express.Router()
var WebArt = require('../../models/article/articles')
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// 添加标签
router.post('/main/addArtList/',(req,res)=>{
    console.log('body',req.body)
    var tag={
        artTitle:req.body.artTitle,
        artType:req.body.artType,
        artContent:req.body.artContent,
        artThumbUpNum:req.body.artThumbUpNum,
        artConmmentsNum:req.body.artConmmentsNum,
    }

    WebArt.findOne({},(err,data)=>{
        if(err) throw err;
        WebArt.create(tag,(err,data)=>{
            if(err){
                throw err
            }
            res.send({status:'success'})
            // res.redirect('/userList')
        })
    })
})

// 获取对应tag的文章
router.post('/main/artList/',(req,res)=>{
    var artList = WebArt.find({
        artType:req.body.type
    },(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})


module.exports = router