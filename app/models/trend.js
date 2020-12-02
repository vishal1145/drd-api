var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trendSchema = new Schema({
   
    trendTitle: 
    {
        type: String,
        required: true
    },
    // trendDescription: 
    // {
    //     type: String,
       
    // },
    trendType: 
    {
        type: String,
       
    },
    trendVendorId: 
    {
        type: String,
       
    },
    trendVendorName: 
    {
        type: String,
       
    },
    
   
    trendUrl :
    {
       type: String  
         
    },
    isActive:
    {
        type:Boolean,
        default:true
    },
   
    
});
 

var Trend= module.exports = mongoose.model('Trend', trendSchema);
module.exports.addTrend = function(trend, callback){
     // console.log("logging in nowwwwww"+client);
    
	Trend.create(trend, callback);
};

