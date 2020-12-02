var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
   
  clientName: 
    {
        type: String,
        required: true
    },
    cityId : 
    {
        type: String
    },
    cityName :
    {
       type: String  
    },
    clientAddress: 
    {
        type: String  
    },
    clientEmail: 
    {
    type: String,
        unique:true
    },
    clientContact:{
        type:String
    },
    panNumber:{
        type: String
    },
    tanNumber:{
        type: String
    },
    stNumber:{
        type: String
    },
    vatNumber:{
        type: String
    },
    clientWebsite:{
        type:String
    },
    clientPlanId:{
        type:String
    },
    clientPlanName:{
        type:String
    },
    clientPlanExpiryDate:{
        type:Date
    }
   
    
});
 

var Client= module.exports = mongoose.model('Client', ClientSchema);

module.exports.addClient = function(client, callback){
      console.log("logging in nowwwwww"+client);
    
	Client.create(client, callback);
};