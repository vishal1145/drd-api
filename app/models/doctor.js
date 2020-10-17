var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var DoctorSchema = new Schema({

    doctorId :
    {
       type: String 
    },
    doctorName:
    {
        type:String,
    },
    gender: 
    {
        type:String
    },
    birth_date: 
    {
        type:Date,
        default:Date.now
    },
    country_code:{
        type:Number
    },
    doctorMobile:{
        type:Number
    },
    emailId:{
        type:String
    },
    password: {
        type: String,
        required: true
    },
    doctorPincode:{
        type:Number
    },
    doctorAdhaarNumber:{
        type: Number
    },
    doctorGender:{
        type:String
    },
    doctorAddress:{
        type:String
    },
    clinicName:{
        type:String
    },
    clinicAddress:{
        type:String
    },
    doctorSpeciality:{
        type:String
    },
    doctorExperience:{
        type:Number
    },
    accessLevelName : {
        type: String
    },
    deviceId: {
        type: String
    },
    emailIdRegistered:{
        type:Boolean,
        default:true
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


// DoctorSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };
 

var Doctor= module.exports = mongoose.model('doctor', DoctorSchema);

module.exports.addDoctor = function(doctor, callback){
      console.log("logging in nowwwwww"+doctor);
    
	Doctor.create(doctor, callback);
};