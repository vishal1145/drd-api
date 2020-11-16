var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
   
    newsDescription: 
    {
        type: String,
        required: true
    },
    newsTitle: 
    {
        type: String,
        required: true
    },
   
    newsUrl :
    {
       type: String  
         
    },
    newsVendorId :
    {
       type: String  
         
    },
    newsVendorName :
    {
       type: String  
         
    },
    newsType :
    {
       type: String  
         
    },
    isActive:
    {
        type:Boolean,
        default:true
    },
   
    
});
 

var Feed= module.exports = mongoose.model('Feed', feedSchema);
module.exports.addFeed = function(feed, callback){
     // console.log("logging in nowwwwww"+client);
    
	Feed.create(feed, callback);
};

