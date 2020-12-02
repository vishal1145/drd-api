var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({

    patientId :
    {
       type: String,
        required:true,
        unique:true
    },
    patientName: 
    {
        type:String
    },
    gender: 
    {
        type:String
    },
    patientDob: 
    {
        type:Date,
    },
    country_code:{
        type:Number
    },
    patientMobile:{
        type:Number
    },
    email:{
        type:String
    },
    pincode:{
        type:Number
    },
    address:{
        type:String
    },
    adhaar_number:{
        type:Number
    },
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
 

var Patient= module.exports = mongoose.model('patient', PatientSchema);

module.exports.addPatient = function(patient, callback){
     Patient.create(patient, callback);
};