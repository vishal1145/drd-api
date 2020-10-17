var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;

var SlotSchema = new Schema({


    clinicId :
    {
       type: String,
    },
    date:
    {
        type: String,
    },
    day:
    {
        type: String,
    },
    isConfirmed:
    {
        type: Boolean,
    },
    slotTimings:[],
    
    doctorId :
    {
       type: String,
    },

});
 

var Slot= module.exports = mongoose.model('slot', SlotSchema);

module.exports.addSlot = function(slot, callback){
    Slot.create(slot, callback);
};