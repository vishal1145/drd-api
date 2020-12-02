var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
   
 
    categoryName :
    {
       type: String  ,
        required:true,
        unique:true
    },
    categoryUrl :
    {
       type: String  
         
    },
    categoryVendorId :
    {
       type: String  ,
        required: true 
    },
    categoryVendorName :
    {
       type: String  ,
        required: true 
    },

    
});
 

var Category= module.exports = mongoose.model('Category', categorySchema);

module.exports.addCategory = function(category, callback){
      
    
	Category.create(category, callback);
};


