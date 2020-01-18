var express = require('express')
var router = express.Router()
var Webuser = require('../../models/user/user')
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

router.post('/main/login/',(req,res)=>{
    console.log('body',req.body)
    var postData = {
        userName:req.body.userName,
        passWord:req.body.passWord
    }

    Webuser.findOne({
        userName:postData.userName,
        passWord:postData.passWord
    },(err,data)=>{
        if(err) throw err;
        console.log('33',data)
        if(data){
            res.send({status:'success'})
        }else{
            res.send('账号或密码错误')
        }
    })
})

router.post('/main/register/',(req,res)=>{
    console.log(req.body)
    var postData = {
        userName:req.body.userName,
        passWord:req.body.passWord,
    }

    // 查询是否注册
    Webuser.findOne({userName:postData.userName},(err,data)=>{
        if(data){
            res.send({status:'repeat'})
        }else{
            Webuser.create(postData,(err,data)=>{
                if(err){
                    throw err
                }
                res.send({status:'success'})
                // res.redirect('/userList')
            })
        }
    })
})

// 获取用户列表
router.get('/userList',(req,res)=>{
    var userList = Webuser.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

// cms 用户登陆
router.post('/main/cmsLogin/',(req,res)=>{
    console.log('body',req.body)
    var postData = {
        userName:req.body.userName,
        passWord:req.body.passWord
    }

    Webuser.findOne({
        userName:postData.userName,
        passWord:postData.passWord,
        authority:1
    },(err,data)=>{
        if(err) throw err;
        if(data){
            res.send({status:'success'})
        }else{
            res.send('账号或密码错误,或该账号权限不足！')
        }
    })
})






module.exports = router