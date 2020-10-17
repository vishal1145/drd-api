var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;

var ClinicSchema = new Schema({

    doctorId :
    {
       type: String,
    },
    clinicId :
    {
       type: String,
    },
    clinicName :
    {
       type: String,
    },
    doctorName:
    {
        type:String,
    },
    country_code:{
        type:Number
    },
    doctorMobile:{
        type:Number
    },
    pincode:{
        type:Number
    },
    clinicAddress:{
        type:String
    },
    slots:[],
    created_at: 
    {
        type:Date,
        default:Date.now
    },
    updated_at: 
    {
        type:Date,
        default:Date.now
    },
});
 

var Clinic= module.exports = mongoose.model('clinic', ClinicSchema);

module.exports.addClinic = function(clinic, callback){
    Clinic.create(clinic, callback);
};