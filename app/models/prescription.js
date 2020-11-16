var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;

var PrescriptionSchema = new Schema({

   
    
    prescriptionId:{
        type:String,
    },
    patientId: 
    {
        type:String
    },
    symptoms: 
    {
        type:String
    },
    remark: 
    {
        type:String
    },
    appointmentDate: 
    {
        type:String
    },
    patientAge: 
    {
        type:String
    },
    patientHeight: 
    {
        type:String
    },
    patientWeight: 
    {
        type:String
    },

    patientBp: 
    {
        type:String
    },

    patientPulse: 
    {
        type:String
    },
    patientMobile: 
    {
        type:Number
    },
    doctorMobile: 
    {
        type:Number
    },
    patientFirstName: 
    {
        type:String
    },
    patientMiddleName: 
    {
        type:String
    },
    patientLastName: 
    {
        type:String
    },
    doctorId:{
        type:String
    },
    doctorName:
    {
        type:String,
    },
    prescriptionData: 
    [],

    medicineHour:[],
    medicineDose:{
        type:String,
    },
    medicineTime:{
        type:String,
    },
    medicineName:[],
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
 

var Prescription= module.exports = mongoose.model('prescription', PrescriptionSchema);

module.exports.addPrescription = function(prescription, callback){
    Prescription.create(prescription, callback);
};