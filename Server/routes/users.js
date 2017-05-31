var express = require('express');
var router = express.Router();

var controller = require('../controllers/useractions');

/* Post Action for Employee Login. */
router.post('/login', function(req, res, next) {
   controller.login(req,res);
});
/* Post Action for Change Password . */
router.post('/changepassword', function(req, res, next) {
   controller.changePassword(req,res);
});
/* Post Action for Forgot Password . */
router.post('/otpgeneration', function(req, res, next) {
   controller.generateOTP(req,res);
});
/* Post Action for Forgot Password . */
router.post('/checkotp', function(req, res, next) {
   controller.checkOtp(req,res);
});
/* Post Action for Reset Password . */
router.post('/resetpassword', function(req, res, next) {
   controller.resetPassword(req,res);
});
/* Post Action for new Employee. */
router.post('/createEmployee', function(req, res, next) {
   controller.createEmployee(req,res);
});
/*  Post Action for TimeSheet. */
router.post('/timesheet', function(req, res, next) {
   controller.performAction(req,res);
});
/* GET Actions for Managers List */
router.get('/managers', function(req, res, next) {
   controller.managersList(req,res);
});

module.exports = router;
