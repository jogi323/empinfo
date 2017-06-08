var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connection =mongoose.connect('mongodb://empinfo:empinfo@ds155631.mlab.com:55631/empinfo');
var  autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
var TimeSheets = require('./timesheet');

var schema = new Schema({
    employeeId: {type: Number, unique: true},
    employeeName: {type: String, required: true},
    
    employeeType: {type: String, required: true},
    role: {type: String, required: true},
    password:{type: String, required: true},
    // department: {type: String, required: true},
    designation: {type: String, required: true},
    // practice: {type: String, required: true},
    // workLocation: {type: String, required: true},
    companyEmail: {type: String, required: false},
    personalEmail: {type: String, required: true},
    primaryMobile: {type: String, required: true},
    alternateMobile: {type: String, required: true},
    joinedOn: {type: String, required: true},
    status:{type:String, required:true},
    dob: {type: String, required: true},
    payRollType: {type: String, required: true},
    cost: {type: String, required: true},
    address:{type:String},
    manager : {type: String},
    empImage:{type:String},
    reportingTo: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
    reportingToHim: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
    firstLogin:{type:Boolean,default:true},
    otp:{type:String, expireAfterSeconds: 300 },
    timesheets: {type: Schema.Types.ObjectId, ref: 'TimeSheets'}
    //tmesheets: [{type: Schema.Types.ObjectId, ref: 'TimeSheets'}]
});
schema.plugin(autoIncrement.plugin, {
    model: 'Employee',
    field: 'employeeId',
    startAt: 1,
    incrementBy: 1
});

// employeeId, employeeName, companyEmail are set a index to search the employee using those fields
schema.index({employeeId: "text", employeeName:"text", companyEmail:"text" });

//exporting the schema 
module.exports = mongoose.model('Employee', schema);