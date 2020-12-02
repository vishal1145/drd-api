var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseHeadsSchema = new Schema({
   
  expenseHeadName: 
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
 

var ExpenseHeads= module.exports = mongoose.model('ExpenseHeads', ExpenseHeadsSchema);

module.exports.addExpenseHead = function(expenseHead, callback){
     // console.log("logging in nowwwwww"+client);
    
	ExpenseHeads.create(expenseHead, callback);
};
