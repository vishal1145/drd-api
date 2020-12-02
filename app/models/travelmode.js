var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TravelModeSchema = new Schema({

    travelModeName :
    {
       type: String ,
        required:true
    }
});
 

var TravelMode= module.exports = mongoose.model('TravelMode', TravelModeSchema);

module.exports.addTravelMode = function(TravelMode, callback){
      //console.log("logging in nowwwwww"+TravelMode);
    
	TravelMode.create(TravelMode, callback);
};