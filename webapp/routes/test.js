var express = require('express')
var router = express.Router()
var User = require('../models/test')
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// router.get('/login',(req,res)=>{
//     res.render('login')
// })

router.get('/page/login/', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.render('login', { title: 'login' });
});

router.get('/page/register', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.render('register', { title: 'register' });
});

// router.get('/register',(req,res)=>{
//     res.render('register')
// })

router.post('/main/login/',(req,res)=>{
    console.log(req.body)
    var postData = {
        userName:req.body.userName,
        passWord:req.body.passWord
    }

    User.findOne({
        userName:postData.userName,
        passWord:postData.passWord
    },(err,data)=>{
        if(err) throw err;
        console.log(data)
        if(data){
            res.send({status:'success'})
        }else{
            res.send('账号或密码错误')
        }
    })
})

router.post('/register',(req,res)=>{
    console.log(req.body)
    var postData = {
        userName:req.body.userName,
        passWord:req.body.passWord,
        age:req.body.age,
        address:req.body.address
    }

    // 查询是否注册
    User.findOne({userName:postData.userName},(err,data)=>{
        if(data){
            res.send('用户名已被注册')
        }else{
            User.create(postData,(err,data)=>{
                if(err){
                    throw err
                }
                console.log('注册成功')
                res.redirect('/userList')
            })
        }
    })
})

// 获取用户列表
router.get('/userList',(req,res)=>{
    var userList = User.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

module.exports = router