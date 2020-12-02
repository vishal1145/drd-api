var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
    subscriptionVendorId: 
    {
        type: String,
       
    },
    subscriptionVendorName: 
    {
        type: String,
       
    },

    subscriptionName: 
    {
        type: String,
       
    },
   
    subscriptionDescription: 
    {
        type: String,
        required: true
    },
    
    subscriptionAmount: 
    {
        type: Number,
       
    },
    subscriptionOfferPrice: 
    {
        type: Number,
       
    },
    
    
   
    subscriptionUrl :
    {
       type: String  
         
    },
    isActive:
    {
        type:Boolean,
        default:true
    },
   
    
});
 

var Subscription= module.exports = mongoose.model('Subscription', subscriptionSchema);
module.exports.addSubscription = function(subscription, callback){
     // console.log("logging in nowwwwww"+client);
    
	Subscription.create(subscription, callback);
};

