var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentModeSchema = new Schema({
   
  paymentModeName: 
    {
        type: String,
        required: true
    },
    clientId:
    {
    type:String
    }
  
   
    
});
 

var PaymentMode= module.exports = mongoose.model('PaymentMode', PaymentModeSchema);

// add vendor
