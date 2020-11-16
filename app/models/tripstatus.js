var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripStatusSchema = new Schema({
   
  tripStatusName: 
    {
        type: String,
        required: true
    },
    clientId:
    {
        type:String
    }
  
   
    
});
 

var TripStatus= module.exports = mongoose.model('TripStatus', TripStatusSchema);

