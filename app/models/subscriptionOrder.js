var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriptionOrderSchema = new Schema({
   
 
    subscriptionId :
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
    type: []
    },

    add:{
        type:String
    },
    isReviewed:{
        type:Boolean,
        default:false
    },
    
    
    createdDate:
    {
        type:Date,
        default:Date.now
        
    },
    startDate:
    {
        type:Date,
        
        
    },
    endDate:
    {
        type:Date,
        
        
    },
    pauseDate:
    {
        type:Date,
       
        
    },
    isPause:
    {
        type:Boolean,
        default:false
        
    }
    
    
});
 

var subscriptionOrder= module.exports = mongoose.model('subscriptionOrder', SubscriptionOrderSchema);

module.exports.addsubscriptionOrder = function(suborder, callback){
      console.log("logging in nowwwwww"+suborder);
    
      subscriptionOrder.create(suborder, callback);
};


