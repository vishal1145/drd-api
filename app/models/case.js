var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;

var CasesSchema = new Schema({

    caseId :
    {
       type: String,
    },
    appointmentId :
    {
       type: String,
    },
    clinicId:{
        type:String
    },
    clinicName:{
        type:String
    },
    patientId:{
        type:String
    },
    patientName: 
    {
        type:String
    },
    patientMobile: 
    {
        type:Number
    },
    doctorId:{
        type:String
    },
    doctorName:
    {
        type:String,
    },
    doctorMobile: 
    {
        type:Number
    },
    caseSubject:{
        type:String
    },
    comment:{
        type:String
    },
    caseStatus:{
        type:String
    },
    appointmentDate:{
        type:Date
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
 

var Cases= module.exports = mongoose.model('cases', CasesSchema);

module.exports.addCase = function(cases, callback){
    Cases.create(cases, callback);
};