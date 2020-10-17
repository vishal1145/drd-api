var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({

    appointmentId:{
        type: String
    },
    appointmentDate: 
    {
        type: String 
    },
    clinicId:{
        type:String
    },
    clinicName:{
        type:String
    },
    clinicAddress:{
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
        type:Number,
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
        type:Number,
    },
    appointmentStartTime:{
        type:String
    },
    appointmentEndTime:{
        type:String
    },
    appointmentType:{
        type:String
    },
    isOnlineAppointment:{
        type:Boolean,
    },
    isCancelled:{
        type:Boolean,
        default:false
        
    },
    isBooked:{
        type:Boolean,
    
       
    },
    occupied_at: 
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
 

var Appointment= module.exports = mongoose.model('Appointment', AppointmentSchema);

module.exports.addAppointment = function(order, callback){
     // console.log("logging in nowwwwww"+order);
    
	Appointment.create(order, callback);
};