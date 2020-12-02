var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlertSchema = new Schema({
   
 
    alertDescription :
    {
       type: String  ,
        required:true
    },
    userId:
    {
        type:String
    },
    clientId:
    {
        type:String
    },
    role:
    {
        type:String
    },
    
    timeStamp:
    {
        type:Date
    },
    isRead:
    {
        type:Boolean,
        default:false
    }
    
});
 

var Alert= module.exports = mongoose.model('Alert', AlertSchema);

module.exports.addAlert = function(alert, callback){
      
    
	Alert.create(alert, callback);
};


