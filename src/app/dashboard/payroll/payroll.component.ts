import { Component } from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  providers:[AppService]
})
export class PayrollComponent {
  // EmployeeID:any;
  isData:boolean = true;
  data:Data;
  sampleData:any;
  OutputData:OutputData[];
  payrolls:any[];
  years:any;
  dateValue:any;
  payRollYear:any;
  months :any;
  date :any;
  todate:any;
  tomonth:any;
  toyear:any;
  populate:any[];
  populatedValues:any;
  days:any;
  day:any;
  date1:any
  //weekday:any;
     constructor(private appser:AppService){
     
this.payrolls = [
          {id:1,types:"Weekly"},
          {id:2,types:"Bi-Weekly"},
          {id:3,types:"Monthly"}
     ];
     this.data={
       payYear:(new Date().getFullYear()),
       payMonth:"",
       paytype:"Weekly"
     }
//      this.data={
//        payRollYear:undefined,
// payMonth:"",
// paytype:""
//      };
     this.OutputData=[{
       EmployeeID:undefined,
       EmployeeName:"",
       BasePay:undefined,
       BusinessUnit:"",
       totalHours:undefined
     }];
     
     this.years=[];
     this.months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     this.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
     this.dateValue = new Date().getFullYear();
     this.payRollYear= (new Date().getFullYear()).toString();
     this.selectedEntry="Weekly";
     }
  selectedEntry;
   onSelectionChange(payroll) {
    //  console.log(payroll);
         console.log(payroll);
        this.selectedEntry = payroll;
        if(this.selectedEntry=="Weekly")
        this.display(this.data.payYear,"Weekly");
          if(this.selectedEntry=="Monthly")
        this.display(this.data.payYear,"Monthly");
          if(this.selectedEntry=="Bi-Weekly")
        this.display(this.data.payYear,"Bi-Weekly");
    }

ngOnInit()
{
  	for (var i = this.dateValue; i>this.dateValue-3; i--)
		{  
			this.years.push({'year':i});
    	
		}
    this.display(this.data.payYear,"Weekly");
}
individualPayslip(EmployeeID){
  alert("generate individula payslip "+EmployeeID);
  // this.appser.url = "http://localhost:8000/timesheet/individualpayslip";
  // this.appser.data = EmployeeID;
  // this.appser.headers = "Content-Type','application/json; charset=utf-8";
// this.appser.postService().subscribe(res => {
//   res
//   console.log(res);
// });
}
getData(data){
  console.log(data);
  // alert("generate payroll");
  this.appser.url = "http://localhost:8000/timesheet/generatePayRoll";
  this.appser.data = data;
this.appser.postService().subscribe(res => {
  // this.sampleData = res;
  
  console.log(res);
  this.sampleData = (res);
  var hai = this.sampleData.PayRollArray;
  var statusCode = this.sampleData.StatusCode;
  this.OutputData = [];
  // console.log(statusCode);
  if(statusCode == "00"){
    this.isData = false;
//     console.log("no data");
//  
  (hai).forEach(element => {
 
  this.OutputData.push({
    EmployeeID:element.EmployeeID,
    EmployeeName:element.EmployeeName,
    BasePay:element.BasePay,
    totalHours:element.totalHours,
    BusinessUnit:element.BusinessUnit,
  });
  
});
 }
else if(statusCode == "01"){
    console.log("no data");
    this.isData = true;
  }
});
}
payroll_year(payRollYear)
{
   
   console.log(payRollYear);
   this.data.payYear=payRollYear;
   if(this.selectedEntry=="Weekly")
   this.display(this.data.payYear,"Weekly");
    if(this.selectedEntry=="Monthly")
   this.display(this.data.payYear,"Monthly");
    if(this.selectedEntry=="Bi-Weekly")
   this.display(this.data.payYear,"Bi-Weekly");
}
display(payRollYear,type)
{
  var yearSelected=payRollYear;
  var t;
  this.date = new Date();
  this.todate = this.date.getDate();
  
  this.tomonth = this.date.getMonth(); 
  this.toyear = this.date.getFullYear();
  this.day=this.date.getDay();
  if(type=="Monthly")
  { 
    if(yearSelected==this.date.getFullYear()){
      this.populate=[];
      for (var i = this.tomonth; i >=0 ; i--)
    	   	 		{   
    	        		this.populatedValues=this.months[i] + "-" + this.todate + "-" +this.toyear;
                  
    	        		this.todate=1;
                  	this.populate.push({'month':this.populatedValues});

              }
              this.data.payMonth=this.populate[0]["month"];
              console.log(this.data.payMonth)
          }
          else{
            this.populate=[];
    	   			for (i = 11; i >=0 ; i--)
    	   	 		{   
    	        		this.populatedValues=this.months[i] + "-1-" + yearSelected;
                  this.populate.push({'month':this.populatedValues});
    	        		
    	   	 		}   
                 this.data.payMonth=this.populate[0]["month"];    		
    	         		
    	   		}
    	    }
    if(type == "Weekly"){

          var temp; 
           this.populate=[];
           
       	    	if(yearSelected == this.date.getFullYear()){
                 for(i=this.tomonth;i>=0;i--){
                    if(i<=this.tomonth-1){
                         this.date.setDate(0);
                    }
                   this.date.setDate(1);
                    
               while (this.date.getDay() !== 1) {
                this.date.setDate(this.date.getDate() + 1);
                  }
                          
                          while (this.date.getMonth() ===i) {
                          temp=this.date.getDate();
                          this.populatedValues=this.months[i] + "-" + temp + "-" +this.toyear;
                          this.populate.push({'month':this.populatedValues});
                          this.date.setDate(this.date.getDate() + 7);
                          
                            }
                         
                       
                        this.date.setDate(0);
                       
                      
                 }
                 this.data.payMonth=this.populate[0]["month"];
                  console.log(this.data.payMonth)
       	    	
                //this.date1=this.date;
                  
               } 
            
             else{
                  this.populate=[];
                  this.date.setFullYear(yearSelected);
                  this.date.setMonth(11);
                  //this.date.setDate(1);
                  
                  for(i=11;i>=0;i--)
                  {
                    
                    if(i<=10){
                         this.date.setDate(0);
                    }
                  
                   this.date.setDate(1);
                    
               while (this.date.getDay() !== 1) {
                this.date.setDate(this.date.getDate() + 1);
                  }
                          
                          while (this.date.getMonth() ===i) {
                          temp=this.date.getDate();
                          this.populatedValues=this.months[i] + "-" + temp + "-" +yearSelected;
                          this.populate.push({'month':this.populatedValues});
                          this.date.setDate(this.date.getDate() + 7);
                          
                            }
                         
                       
                        this.date.setDate(0);
                       
              }
               this.data.payMonth=this.populate[0]["month"];

              }

              }

       if(type=="Bi-Weekly")
         { 
              if(yearSelected==this.date.getFullYear()){
              this.populate=[];
              for(i=this.tomonth;i>=0;i--)
              {
                if(i<=this.tomonth-1){
                         this.date.setDate(0);
                    }
               this.date.setDate(1);
               while (this.date.getMonth() ==i) {
                          temp=this.date.getDate();
                          if(temp<=30){
                          this.populatedValues=this.months[i] + "-" + temp + "-" +this.toyear;
                          this.populate.push({'month':this.populatedValues});
               }
                          this.date.setDate(this.date.getDate() + 15);
                          
                          
                     }
                         
                       
                        this.date.setDate(0);


              }
              this.data.payMonth=this.populate[0]["month"];
              console.log(this.data.payMonth)
              

            }
            else{

                this.populate=[];
                  this.date.setFullYear(yearSelected);
                  this.date.setMonth(11);
                  //this.date.setDate(1);
                  
                  for(i=11;i>=0;i--)
                  {
                    
                    if(i<=10){
                         this.date.setDate(0);
                    }
                  
                   this.date.setDate(1);
                    
              
                          
                          while (this.date.getMonth() ===i) {
                          temp=this.date.getDate();
                          if(temp<=30){
                          this.populatedValues=this.months[i] + "-" + temp + "-" +yearSelected;
                          this.populate.push({'month':this.populatedValues});
                          }
                          this.date.setDate(this.date.getDate() + 15);
                          
                            
                          }
                         
                       
                        this.date.setDate(0);
                       
              }

             this.data.payMonth=this.populate[0]["month"];




            }
}
}
}
interface Data
{
payYear:Number;
payMonth:String;
paytype:String;
}
interface OutputData{
  EmployeeID:Number;
  EmployeeName:String;
  BusinessUnit:String;
  totalHours:Number;
  BasePay:Number;
}
        