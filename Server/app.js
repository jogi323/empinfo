var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
var multer = require("multer");

var index = require('./routes/index');
var users = require('./routes/users');
var timesheet = require('./routes/timesheet');


var app = express();
//File Upload
var storage =   multer.diskStorage({

  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, callback) {
    console.log("file");
    callback(null, file.originalname);
  }
});
  var upload = multer({ //multer settings
                    storage: storage
                }).single("file");

app.listen(8000, function(){ console.log("port listening on 8080")});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/timesheet', timesheet);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.post('/uploads', function(req, res,next) {
     upload(req,res,function(err){
         console.log("body:");
         console.log(req.body);
            console.log(req.file);
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
        // next();
    });
module.exports = app;
