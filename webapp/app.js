var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser')


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webapp');
var db = mongoose.connection;

db.on('open',()=>{
  console.log('连接成功')
})

db.on('error',()=>{
  console.log('连接失败')
})

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var testRouter = require('./routes/test');

// 用户路由
const usersRouter = require('./routes/loginAndRegister/user')
const tagRouter = require('./routes/tag/tag')
const artRouter = require('./routes/article/article.js')

var app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 将图片存放路径暴露出去
app.get('/public/images/*', function (req, res) {
    res.sendFile( __dirname  + req.url );
})  


app.use('/', indexRouter);

app.use('/', usersRouter);

// 标签路由
app.use('/', tagRouter);
// 文章路由
app.use('/', artRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
