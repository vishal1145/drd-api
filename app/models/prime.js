var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrimeSchema = new Schema({
    orderId :
    {
       type: String,
        required:true,
        unique:true
    },
    eventDate:{

    },
    time:{

    },
    guests:{

    },
    orderType:{

    },
    description:{

    },
    
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    contactNum:{
        type:Number
    },
    status:{
        type:String
    },
    add:{
        type:String
    },
    createdDate:
    {
        type:Date,
        default:Date.now
    },
    
    vendorName:{
        type:String
    },
    vendorId:{
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
    isReviewed:{
        type:Boolean,
        default:false
    },
    isCancelled:{
        type:Boolean,
        default:false
    },
    
    
});
 
var Prime= module.exports = mongoose.model('Prime', PrimeSchema);

module.exports.addPrime = function(prime, callback){
      console.log("logging in nowwwwww"+prime);
    
	Prime.create(prime, callback);
};
