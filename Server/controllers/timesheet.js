var mongoose = require('mongoose');
var TimeSheet = require('../model/timesheet');



exports.insertData = function(req, res){
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
    
    TimeSheet.find({}, function(err, employee){
        if (err) console.log(err)
        if (!employee[0]){
           var timesheet = new TimeSheet({
                employeeid: req.body.empId,
                employeename: req.body.empName,
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
            timesheet.save();
        }
        else{
            console.log("not found" + employee[0].data[0].yearData[0]);
            var DayFound = false;
            
                for(var k = 0; k < employee[0].data.length; k++){
                    for(var i = 0; i < employee[0].data[k].yearData.length; i++) {
                        for(var l = 0; l < employee[0].data[k].yearData[i].monthData.length; l++){
                            if (employee[0].data[k].yearData[i].monthData[l].day == rDay) {
                                var dayId = employee[0].data[k].yearData[i].monthData[l]._id;
                                DayFound = true;
                                break;
                            }
                        }
                    }
                }

            var MonthFound = false;
            for(var k = 0; k < employee[0].data.length; k++){
                for(var i = 0; i < employee[0].data[k].yearData.length; i++) {
                    if (employee[0].data[k].yearData[i].month == rMonth) {
                        var monthId = employee[0].data[k].yearData[i]._id;
                        MonthFound = true;
                        break;
                    }
                }
            }

            var YearFound = false;
            
            for(var j = 0; j < employee[0].data.length; j++) {
                if (employee[0].data[j].year == rYear) {
                    var yearId = employee[0].data[j]._id
                    YearFound = true;
                    break;
                }
            }


            
            //check if there is an year property or not
            if('year' in employee[0].data[0]){
                console.log("year present");
                //if year present and mathes the received year
                if(YearFound){
                    console.log("it matched the received year");
                    //cheking for month
                    if('month' in employee[0].data[0].yearData[0]){
                        console.log("month present");
                        //if month matches the received month
                        if(MonthFound){
                            //if record with same day there
                            if(DayFound){
                                console.log("record with the date is present")
                            }
                            else{
                                console.log(monthId)
                                var dWork = {desc:req.body.desc, day:req.body.day, time:req.body.time}
                                employee[0].data.id(yearId).yearData.id(monthId).monthData.push({dayData:dWork, day:rDay})
                                employee[0].save();
                                console.log("day data saved");
                            }
                        }else{
                            console.log("month not matched");
                            var dWork = {desc:req.body.desc, day:req.body.day, time:req.body.time}
                            var dayWork = {dayData:dWork, day:rDay}
                            employee[0].data.id(yearId).yearData.push({monthData:dayWork, month:rMonth})
                            employee[0].save();
                            console.log("month created");
                        }
                    }

                    //if month not present
                    else{
                        console.log("month not present");
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
                    employee[0].data.push({year:rYear, yearData:mWork})
                    employee[0].save();
                    console.log("saved with year");

                }
            }//check if there is an year property or not

            //if there is not an year property or not
            else{
                copnsole.log("year not present");
                
            }//if there is not an year property or not

        }
    })
    
};

exports.getData = function(req,res){

}