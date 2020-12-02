var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TravelPurposeSchema = new Schema({

    travelPurpose :
    {
       type: String ,
        required:true
    }
    
});
 

var TravelPurpose= module.exports = mongoose.model('TravelPurpose', TravelPurposeSchema);

