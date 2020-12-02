var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LaundrySchema = new Schema({
    orderId :
    {
       type: String,
        required:true,
        unique:true
    },
    time: 
    {
    
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
    add:{
        type:String
    },
    createdDate:
    {
        type:Date,
        default:Date.now
    }
    
    
    
    
    
    
});
 
var Laundry= module.exports = mongoose.model('Laundry', LaundrySchema);

module.exports.addLaundry = function(laundry, callback){
      console.log("logging in nowwwwww"+laundry);
    
	Laundry.create(laundry, callback);
};
