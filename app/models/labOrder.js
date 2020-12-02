var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LabOrderSchema = new Schema({
   
 
    orderId :
    {
       type: String,
        required:true,
        unique:true
    },
    orderDesc: 
    {
    type: []
    },
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    createdDate:
    {
        type:Date,
        default:Date.now
    }
    
});
 

var labOrder= module.exports = mongoose.model('labOrder', LabOrderSchema);

module.exports.addlabOrder = function(order, callback){
      console.log("logging in nowwwwww"+order);
    
      labOrder.create(order, callback);
};


