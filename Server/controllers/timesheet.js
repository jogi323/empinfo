var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var TimeSheet = require('../model/timesheet');
var Employee = require('../model/empschema');

exports.insertData = function(req, res){
    console.log("parameters"+ req.query);
    var month = new Array();
    month[0] = "January";
    month[01] = "February";
    month[02] = "March";
    month[03] = "April";
    month[04] = "May";
    month[05] = "June";
    month[06] = "July";
    month[07] = "August";
    month[08] = "September";
    month[09] = "October";
    month[10] = "November";
    month[11] = "December";

    var date = req.body.day;
    var dateParts = date.split('-');
    var rMonth = month[Math.round(dateParts[1])];
    console.log(month[Math.round(dateParts[1])])
    var rYear = dateParts[0];
    var rDay = dateParts[2].slice(0,2);
    console.log("received date" + rDay);
    var workData = [];
    workData.push({work:req.body.work, date: date, timeIn:req.body.timeIn,timeOut:req.body.timeOut})
    var newYear = { [rMonth]:workData };

    var decoded = jwt.decode(req.query.token);
    console.log("decodedtoken"+" "+ decoded.data[0]._id)
    Employee.findById(decoded.data[0]._id, function(err, employee){
        console.log(employee);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(employee.timesheets != null){
            console.log(employee.timesheets);
            TimeSheet.findById(employee.timesheets, function(err, timesheetData){
                console.log(timesheetData);
                var DayFound = false;
                for(var k = 0; k < timesheetData.data.length; k++){
                    for(var i = 0; i < timesheetData.data[k].yearData.length; i++) {
                        for(var l = 0; l < timesheetData.data[k].yearData[i].monthData.length; l++){
                            if (timesheetData.data[k].yearData[i].monthData[l].day == rDay) {
                                var dayId = timesheetData.data[k].yearData[i].monthData[l]._id;
                                DayFound = true;
                                break;
                            }
                        }
                    }
                }

                var MonthFound = false;
                for(var k = 0; k < timesheetData.data.length; k++){
                    for(var i = 0; i < timesheetData.data[k].yearData.length; i++) {
                        if (timesheetData.data[k].yearData[i].month == rMonth) {
                            var monthId = timesheetData.data[k].yearData[i]._id;
                            MonthFound = true;
                            break;
                        }
                    }
                }

                var YearFound = false;
                
                for(var j = 0; j < timesheetData.data.length; j++) {
                    if (timesheetData.data[j].year == rYear) {
                        var yearId = timesheetData.data[j]._id
                        YearFound = true;
                        break;
                    }
                }
                //if year present and mathes the received year
                if(YearFound){
                    console.log("it matched the received year");
                        //if month matches the received month
                        if(MonthFound){
                            //if record with same day there
                            if(DayFound){
                                console.log("record with the date is present");
                            }
                            else{
                                console.log(monthId)
                                var dWork = {desc:req.body.desc, day:req.body.day, time:req.body.time}
                                timesheetData.data.id(yearId).yearData.id(monthId).monthData.push({dayData:dWork, day:rDay})
                                timesheetData.save();
                                console.log("day data saved");
                                res.json({
                                    code:0,
                                    message: 'Saved message',
                                    
                                });
                            }
                        }else{
                            console.log("month not matched");
                            var dWork = {desc:req.body.desc, day:req.body.day, time:req.body.time}
                            var dayWork = {dayData:dWork, day:rDay}
                            timesheetData.data.id(yearId).yearData.push({monthData:dayWork, month:rMonth})
                            timesheetData.save();
                            console.log("month created");
                            res.status(201).json({
                                    message: 'Saved message',
                                    obj: result
                                });
                        }
                    }//if year present and mathes the received year

                else{
                    console.log("year not matched");
                    //console.log(yearId)
                    var dWork = {desc:req.body.desc, day:req.body.day, time:req.body.time}
                    var dayWork = {dayData:dWork, day:rDay}
                    var mWork = [];
                    mWork.push({monthData:dayWork, month:rMonth});
                    console.log(mWork);
                    timesheetData.data.push({year:rYear, yearData:mWork})
                    timesheetData.save();
                    console.log("saved with year");
                    res.status(201).json({
                        message: 'Saved message',
                        obj: result
                    });
                }
            })
            
        }
        else{
             var timesheet = new TimeSheet({
                employeeid: employee.employeeId,
                employee:employee,
                data:[{
                    year: rYear,
                    yearData:[{
                         month: rMonth,
                         monthData:[{
                             day: rDay,
                             dayData:{
                                 desc:req.body.desc,
                                 day: req.body.day,
                                 time: req.body.time
                             }
                         }]
                    }]
                }]
            })  
            timesheet.save(function(err, result){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                employee.timesheets = result;
                employee.save();
                res.status(201).json({
                    message: 'Saved message',
                    obj: result
                });
            });
        }
    })

}

exports.getData = function(req, res){
    var id = req.params.id;
    console.log("Timesheet id"+id);
    TimeSheet.findById(id)
             .populate('employee','joinedOn')
             .exec(function(err, tsData){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                else{
                    console.log(tsData);
                    console.log(tsData.employee.joinedOn);
                    
                    var month = new Array();
                    month[0] = "January"; month[01] = "February"; month[02] = "March"; month[03] = "April"; month[04] = "May"; month[05] = "June";
                    month[06] = "July"; month[07] = "August"; month[08] = "September"; month[09] = "October"; month[10] = "November"; month[11] = "December";

                    var joinedDateParts = tsData.employee.joinedOn.split('-');
                    var joinedYear = joinedDateParts[0];
                    var joinedMonth = month[Math.round(joinedDateParts[1])];
                    var joinedDay = joinedDateParts[2];
                    console.log(joinedYear+" "+joinedMonth+ " " + joinedDay+ " ");
                    var dayData = []
                    var monthData = []
                    var yearData = []
                    for(var i=0; i<tsData.data.length; i++){
                        for(var j = 0; j<tsData.data[i].yearData.length;j++){
                            for(var k = 0; k<tsData.data[i].yearData[j].monthData.length;k++){
                               // console.log(tsData.data[i].yearData[j].monthData[k].dayData)
                               var ts = [{workingHours:tsData.data[i].yearData[j].monthData[k].dayData.time},{date:tsData.data[i].yearData[j].monthData[k].dayData.day}]
                                dayData.push({data : ts})
                               // console.log(dayData[tsData.data[i].yearData[j].monthData.length]);
                            }
                        }
                        
                    }
                    console.log(dayData)

                    res.json(dayData)
                }
            }) 
}

exports.getData1 = function(req, res){
    TimeSheet.find({_id:"59319ab9af8e430bf8f8bf26"},{'data.year': {$gte: 2017}})
              .populate('employee','joinedOn')
             .exec(function(err, tsData){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                else{
                    console.log(tsData);
                    console.log(tsData.employee.joinedOn);
                    res.json(tsData)
                }
            }) 
            
}
