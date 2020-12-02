var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
   
 
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
    totalAmount:{
        type:String
    },
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    status:{
        type:String
    },
    rate:{
        type:Number,
        
    },
    feedback: 
    {
        type:String
    },

    add:{
        type:String
    },
    isReviewed:{
        type:Boolean,
        default:false
    },
    isCancelled:{
        type:Boolean,
        default:false
    },
    isRate:{
        type:Boolean,
        default:false
    },
    isFeedback:{
        type:Boolean,
        default:false
    },
    
    
    createdDate:
    {
        type:Date,
        default:Date.now
        
    }
  
    
});
 

var Order= module.exports = mongoose.model('Order', OrderSchema);

module.exports.addOrder = function(order, callback){
      console.log("logging in nowwwwww"+order);
    
	Order.create(order, callback);
};


