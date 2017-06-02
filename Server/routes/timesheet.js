var express = require('express');
var router = express.Router();

var timesheetController = require('../controllers/timesheet');

/* Post Action for Employee Login. */
router.post('/', function(req, res, next) {
    //console.log(req.params.id);
   timesheetController.insertData(req,res);
});

router.get('/', function(req, res, next) {
   timesheetController.getData(req, res);
});

module.exports = router;
