var mongoose = require('mongoose');
var Product = require('../model/timesheet');
var Employee = require('../model/empschema');
var generator = require('generate-password');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

//Employee Login
exports.login = function(req,res){
    //console.log(req.body);
    Employee.find({$and:[{personalEmail:req.body.email},{password:req.body.password}]},function(err,data){
        if(err){
            throw err;
        }else if(data[0] == null){
            res.json({code:0,msg:'Invalid Credentials'});
        }else {
            var secret = '123456';
            var token = jwt.sign({data: data}, 'secret', {expiresIn: 7200});
            // console.log(token);
            // console.log(data);
            res.json({code:1,data:data,token:token});
        }
    })
}
//Change Password Action
exports.changePassword = function(req,res){
    //console.log(req.body.employeeId);
    var oldPassword = req.body.currentpassword;
    var newPassword = req.body.newpassword;
    var confirmPassword = req.body.confirmpassword;
    Employee.find({ password: oldPassword }, function(err, docs) {
            //console.log(docs);
            if (err) {
                throw err;
            } else {
                //console.log(docs);

                if (docs[0] == null) {
                    // res.json({ success: false, msg: 'Please Fill The All Fields....' });
                    res.json({code:0,msg:"user not found........."});
                } else {
                    
                    const newpswd = req.body.newpassword;
                    const cpswd = req.body.confirmpassword;
                    
                    if (newpswd != cpswd) {
                        res.json({code:1, success: false, msg: 'password does not match....' });
                        console.log("Password does not match")
                    } else {
                       console.log(newPassword)
                        Employee.update({ employeeId: req.body.employeeId },{ $set: { password: newPassword,firstLogin: false } }, function(err, docs) {
                                console.log("***************hjjkjjkj******************");
                                console.log(docs)
                                if (err) {
                                    res.json({code:2, success: false, msg: 'User not updated' });
                                } else {
                                    res.json({ code:3,success: true, msg: 'password updated Successfully' });
                                }

                            }) //update closing



                    } //else close



                } //


            } //find else closing


        }) //find closing
}
//Reset Password
exports.resetPassword = function(req,res){
   // console.log(req.body);
    console.log(req.body.email);
    if(req.body.email){
        Employee.update({personalEmail:req.body.email},{$set:{password:req.body.newpassword}},function(err,data){
            if(err){
                throw err;
            }else{
                res.json({code:0,msg:"password updated successfully"});
            }
        });
    }else{
        res.json({code:1,msg:"email not found"});
    }
    
}
//creating a new employee
exports.createEmployee = function (req, res) {
    var password = generator.generate({
    length: 10,
    numbers: true
});
        var employee = new Employee({
        employeeName: req.body.ename,
       
        employeeType: req.body.etype,
        role: req.body.erole,
        password: password,
        // department: req.body.department,
        designation: req.body.designation,
        // practice: req.body.practice,
        // workLocation: req.body.workLocation,
        // companyEmail: req.body.companyEmail,
        personalEmail: req.body.email,
        primaryMobile: req.body.mobile1,
        alternateMobile: req.body.mobile2,
        joinedOn: req.body.doj,
        status: req.body.jobstatus,
        dob: req.body.dob,
        address: req.body.address,
        manager: req.body.rmanager,
        payRollType: req.body.epayroll,
        cost: req.body.ctc,
        empImage :req.body.fileName,
        firstLogin: true,
        otp:'558525',
    });

    //  var name1 = firstname.toString().replace(/ /g,'').slice(0,4);
    //  console.log(name1);
    //  var name2 = req.body.fname;
    //  console.log(name2);
Employee.find({employeeId: req.body.rmanager}, function (err, data) {
        // console.log(data[0]);
        console.log("hai");
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else {
            if (data[0] != null) {
                // console.log("modified data is ");

                employee.save(function (err, result) {
                     console.log("result");
                   
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    } else {
                      
                         data[0].reportingToHim.push(result);
                        console.log("reporting to him is " + data[0].reportingToHim);
                        data[0].save(function(err,resul){
                            if(err){
                                console.log("error in executing query");
                                throw err;
                            }
                            else {
                                console.log("modified data::::");
                                console.log(resul);
                            }
                        });
                        console.log(data[0]);
                        
                        result.reportingTo.push(data[0]);
                        result.save(function(err,res){
                            console.log("modified result::::");
                            console.log(res);
                        });



                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: 'OAuth2',
                                user: 'employeeinfo2017@gmail.com',
                                clientId: '528229256660-0mutl5osctron0r6d5oc666g5p18sa8t.apps.googleusercontent.com',
                                clientSecret: '74wV6UIu4GHGtjUNXsui2M1D',
                                refreshToken: '1/9mlLHY0C_RS9q8vATN-WLhlJvTRKLCGVXKx2fwctrbFVuRt1xmVFkxUkb4zNTzU3',
                                accessToken: 'ya29.GltOBAZopW-lUfjwEwTxgr1kF7cyqUb4BZVs9Q96XTF96HmF6qTDOcvT8Fzb7jOsJ2DqUgKNwiG6GKnEaNLCanB0MhdcpAkY4gMDkM_psDxryf4yKTSJodQWAqk-'
                            }
                        })

                        var mailOptions = {
                            from: 'admin <employeeinfo2017@gmail.com>',
                            to: req.body.email,
                            subject: 'New Employeement EmployeeId',
                            html: '<h3>Hello User<h3><br><br>This is to convey that your password was reset, you can enjoy our services from now on Your  Employeeid:' + result.employeeId + '<br> possword:' + result.password + '<br>'
                        }

                        transporter.sendMail(mailOptions, function (err, res) {
                            if (err) {
                                console.log('Error');
                            } else {
                                result.status = "true";
                                result.save();
                                console.log('Email Sent');
                            }
                        })
                       

                        res.status(201).json({
                            message: 'User created',
                            obj: result,
                            secondObj: data
                        });
                    }

                });
            } else {
                res.status(201).json({
                    message: 'manager not  existed',

                });
            }

        }
    })

}
//Managers List
exports.managersList = function(req,res){
    Employee.find({role:'Manager'},function(err,data){
        if(err){
            throw err;
        }else{
            res.json(data);
        }
    })
}
//Forgot Password
exports.generateOTP=function(req,res){
    var email=req.body.email;
    var otp=Math.floor(Math.random()*90000) + 100000;
    //console.log(otp);
    Employee.find({personalEmail:email },function(err,data){
        if(err){
            throw err;
        }else if(data[0]!=null){
             var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: 'OAuth2',
                                user: 'employeeinfo2017@gmail.com',
                                clientId: '528229256660-0mutl5osctron0r6d5oc666g5p18sa8t.apps.googleusercontent.com',
                                clientSecret: '74wV6UIu4GHGtjUNXsui2M1D',
                                refreshToken: '1/9mlLHY0C_RS9q8vATN-WLhlJvTRKLCGVXKx2fwctrbFVuRt1xmVFkxUkb4zNTzU3',
                                accessToken: 'ya29.GltOBAZopW-lUfjwEwTxgr1kF7cyqUb4BZVs9Q96XTF96HmF6qTDOcvT8Fzb7jOsJ2DqUgKNwiG6GKnEaNLCanB0MhdcpAkY4gMDkM_psDxryf4yKTSJodQWAqk-'
                            }
                        })

                    var mailOptions =  {
                        from: 'admin <employeeinfo2017@gmail.com>',
                        to:req.body.email, 
                        subject:'OTP to change password.', 
                        html:'<h3>Dear User,</h3><br>Your OTP is:'+otp+''
}

                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });
            Employee.update({personalEmail:email},{$set:{otp:otp}},function(err,data){
                if(err){
                    throw err;
                }else{                    
                    res.json({status:200,data:otp});
                }
            })
             
            }else{
                res.json({status:404});
            }
    });
}
//OTP Validation
exports.checkOtp=function(req,res){
   var email=req.body.email;
   var otp=req.body.otp;
   console.log("cHECK otp"+otp);
  
   Employee.find({personalEmail:email,otp:otp},function(err,data){
       console.log(data[0]);
       if(err){
           throw err;
       }else if(data[0]){
           //console.log(data[0]);
        res.json({status:200,msg:'Valid Otp'});
       }else{
           res.json({status:404,msg:'Invalid Otp'});
       }
   })

}
//TimeSheet Action
exports.performAction = function(req, res){
    console.log(req.body);
var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var date = new Date();
    var rMonth = month[date.getMonth()];
    var rYear = date.getFullYear();
    var rDay = date.getDate();
    console.log("received date" + rDay);
    var workData = [];
    workData.push({work:req.body.work, date: date, timeIn:req.body.timeIn,timeOut:req.body.timeOut})
    var newYear = { [rMonth]:workData };
    console.log(rMonth);
    Product.findById("5927e27ed905a91db80c80d4", function(err, employee){
        if (err) console.log(err)
        if (!employee){
           var product = new Product({
                employeeid: req.body.empId,
                employeename: req.body.empName,
                data:{
                    year: rYear,
                    yearData:[{
                         month: rMonth,
                         monthData:[{
                             day: rDay,
                             dayData:[{
                                 work:req.body.work,
                                 day: date
                             }]
                         }]
                    }]
                }
            })  
            product.save();
        }
        else{
            var MonthFound = false;
            
            for(var i = 0; i < employee.data.yearData.length; i++) {
                if (employee.data.yearData[i].month == rMonth) {
                    var monthId = employee.data.yearData[i]._id;
                    MonthFound = true;
                    break;
                }
            }

            var YearFound = false;
            
            for(var j = 0; j < employee.data.length; j++) {
                if (employee.data[j].year == rYear) {
                    YearFound = true;
                    break;
                }
            }


            console.log(employee.data.yearData[0].monthData[0].dayData[0].work);
            //check if there is an year property or not
            if('year' in employee.data){
                console.log("year present");
                //if year present and mathes the received year
                if(employee.data.year == rYear){
                    console.log("it matched the received year");
                    //cheking for month
                    if('month' in employee.data.yearData[0]){
                        console.log("month present");
                        //if month matches the received month
                        if(MonthFound){
                            //if record with same day there
                            if(employee.data.yearData[0].monthData[0].day == rDay){
                                console.log("record with the date is present")
                            }
                            else{
                                var dData = [];
                                dData.push({day:date, work:req.body.work});
                                console.log(monthId)
                                var mData = [];
                                mData.push({dayData:dData, day:rDay});
                                employee.data.yearData.id(monthId).monthData.push({dayData:dData}, {day:rDay})
                                employee.save();
                                
                            }
                        }else{
                            console.log("month not matched");
                            
                        }
                    }

                    //if month not present
                    else{
                        console.log("month not present");
                    }
                }//if year present and mathes the received year

                else{
                    console.log("year not matched");
                    

                }
            }//check if there is an year property or not

            //if there is not an year property or not
            else{
                copnsole.log("year not present");
                
            }//if there is not an year property or not


            // if('year2017' in employee.year[0]){
            //     if('May' in employee.year[0].year2017[0]){
            //         Product.update({_id:"5926b44f15e7d61e28dcda6e"},
            //                         {$push:{$push:{may: workData}}},
            //                         function(err, data){
            //                             if (err) console.log(err);
            //                              console.log(data);
            //                         }
            //                         )
            //     }
            // }
            // else{
            //     console.log("yes year is not there");
            // }
            // if(!employee.year[0].year){
            //     Product.update({emplyeeid:2471},
            //                     {$push:{year: newYear}},
            //                     function(err, data){
            //                         if (err) console.log(err);
            //                         console.log(data);
            //                     }
            //     )
            // }
            // if (employee.year[0].year == rYear){
            //     if(employee.year[0].month == rMonth){
                    
            //     }
            // }
            // else{
                
            // }
        }
    })
    
};

exports.getData = function(){
    var year = 2017[0];
    Product.find({}, function(err, data){
        if (err) console.log(err);
        console.log(data[0].year[0].january[0].work);
    })
};

exports.update = function(){
    var januaryM = [];
    januaryM.push({work:"changed", date:"changed", timeOut:"changed", timeIn:"changed"});
    var newyear = { year:'2018' , january:januaryM};
    Product.update({_id:"5925421e6666c418ec33bbf3"},
                    {$push:{year: newyear}},
                    function(err, data){
                        if (err) console.log(err);
                        console.log(data);
                    }
                    );
}
exports.allUsers = function(req, res) {
    Employee.find(function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json({ status: 200, data: data })
        }
    })
}
exports.empdetails = function(req,res){
    var id = req.params.id;
    console.log(id);
    Employee.find({_id:id},function(err,data){
        if(err){
            throw err;
        }else{
            console.log(data);
            res.json({code:0,data:data});
        }
    })
}
exports.updateUser = function(req,res){
   var id=req.body.employeeId;
   console.log(id);
  Employee.update({employeeId:id,personalEmail:req.body.personalEmail},{$set:{employeeType: req.body.etype, role: req.body.erole,designation: req.body.designation,primaryMobile: req.body.mobile1,alternateMobile: req.body.mobile2,  address: req.body.address,manager: req.body.rmanager, payRollType: req.body.epayroll,cost: req.body.ctc}},{multi:true},function(err,data){
      console.log(data);
 if(err){
    res.json({status:0,msg:'Failed to updated'});
 }
 else if(data){
  res.json({status:1,msg:'updated Successfully'});
 }
})
}