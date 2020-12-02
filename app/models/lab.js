var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LabSchema = new Schema({
   
    clientId:{
        type:String
    },
  labName: 
    {
        type: String,
        required: true
    },
    labTariff:
    {
        type:Number
    },
    labAddress:
    {
        type:String
    },
    labContactNumber:
    {
        type:String
    },
    labRemark:
    {
        type:String
    },
    labUrl:
    {
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
    
   
    
});
 

var Lab= module.exports = mongoose.model('Lab', LabSchema);

module.exports.addLab = function(lab, callback){
      console.log("logging in nowwwwww"+lab);
    
      Lab.create(lab, callback);
};