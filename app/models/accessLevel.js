var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessLevelSchema = new Schema({
   
  accessLevelName: 
    {
        type: String,
        required: true
    },
    accessLevelNumber:
    {
        type:Number
    }
  
   
    
});
 

var AccessLevel= module.exports = mongoose.model('AccessLevel', AccessLevelSchema);

