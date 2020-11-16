var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendorCategorySchema = new Schema({

    vendorCategoryName :
    {
       type: String ,
        
        
    },
    vendorCategoryUrl :
    {
       type: String ,
        
    },
    isActive:
    {
        type:Boolean,
        default:true
    },
    
    
});
 

var vendorCat= module.exports = mongoose.model('vendorCategory', vendorCategorySchema);


module.exports.addvendorCategory = function(vendorCategory, callback){
      
    
	vendorCat.create(vendorCategory, callback);
};


