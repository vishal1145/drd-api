var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoreSchema = new Schema({

    storeName :
    {
       type: String  ,
        
    },
    storeUrl :
    {
       type: String  ,
         
    },
    storeContactNumber:
    {
       type:String,
    },
    storeAddress :
    {
       type: String  ,
        
    },
    storeVendorId :
    {
       type: String  ,
        
    },
    storeVendorName :
    {
       type: String  ,
        
    },
    deliveryStatus :
    {
       type: Boolean  ,
       default:true 
    },
    operationDays :
    {
       type: []
       
        
       
    },
    Timings :
    {
       type: []  
       
    },
    isActive :
    {
       type:Boolean,
       default:true,
    }
   




    
});
 

var Store= module.exports = mongoose.model('Store', StoreSchema);

module.exports.addStore = function(store, callback){
     // console.log("logging in nowwwwww"+client);
    
	Store.create(store, callback);
};