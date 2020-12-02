var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeGradeSchema = new Schema({
   
  employeeGrade: 
    {
        type: String,
        required: true
    },
    clientId:
    {
        type:String
    },
    isActive:
    {
        type:Boolean,
        default:true
    }
  
   
    
});
 

var EmployeeGrade= module.exports = mongoose.model('EmployeeGrade', EmployeeGradeSchema);

module.exports.addEmployeeGrade = function(employeeGrade, callback){
     // console.log("logging in nowwwwww"+client);
    
	EmployeeGrade.create(employeeGrade, callback);
};
