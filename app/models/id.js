var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var IdSchema = new Schema({
  _id: { type: String, required: true, index: { unique: true } },
  seq:  { type: Number, required: true },
    userId: {type:String},
    type:{type:String}
});
 
var Id = module.exports = mongoose.model('Id', IdSchema);