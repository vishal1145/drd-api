var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
   
    
    subCategoryName: 
    {
        type: String
    },
    imgUrl: {
        type:String,

    },
    subCategoryVendorId :
    {
       type: String  ,
        required: true 
    },
    subCategoryVendorName :
    {
       type: String  ,
        required: true 
    },
    categoryVendorId :
    {
       type: String  ,
        
    },
    categoryVendorName :
    {
       type: String  ,
        
    },
    
    isActive:{
        type:Boolean,
        default:true
    }
    
   
    
});
 

var SubCategory= module.exports = mongoose.model('SubCategory', SubCategorySchema);