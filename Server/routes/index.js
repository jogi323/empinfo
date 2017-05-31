var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //products.performAction();
  //products.getData();
 //products.update(2017);
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
 
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
 // products.performAction(req,res);
  //res.render('index', { title: 'Express' });
});


module.exports = router;
