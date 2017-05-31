var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://empinfo:empinfo@ds155631.mlab.com:55631/empinfo');

var monthSchema = new Schema({
     month: String,
     monthData: [Schema.Types.Mixed] 
});

var ProductSchema = new Schema({
    employeeid: String,
    employeename: String,
    data: {
        year: {type: String},
        yearData: [monthSchema],
    },
    employee: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
    //data: [{type: [Schema.Types.Mixed], data:[childSchema]}],

}, {strict: false});

mongoose.model("Product", ProductSchema);

var Product = mongoose.model("Product");

