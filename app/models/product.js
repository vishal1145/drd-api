var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
   
    productName: 
    {
        type: String,
        required: true
    },
    productCost : 
    {
        type: Number,
        required: true 
    },
    productsell : 
    {
        type: Number,
        required: true 
    },
    productQuantity : 
    {
        type: String,
        required: true 
    },
    categoryId :
    {
       type: String  ,
        required: true 
    },
    categoryName :
    {
       type: String  ,
        required: true 
    },
    productUrl :
    {
       type: String  
         
    },
    isActive:
    {
        type:Boolean,
        default:true
    },
    productSubCategoryId :
    {
       type: String  
       
    },
    productSubCategory :
    {
       type: String  
    
    },
    productVendorId :
    {
       type: String  ,
        required: true 
    },
    productVendorName :
    {
       type: String  ,
        required: true 
    },
   
    
});
 

var Product= module.exports = mongoose.model('Product', productSchema);
module.exports.addProduct = function(product, callback){
     // console.log("logging in nowwwwww"+client);
    
	Product.create(product, callback);
};