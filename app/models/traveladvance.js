var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TravelAdvanceSchema = new Schema({

    tripId :
    {
       type: String ,
        required:true
    },
    advanceAmount:
    {
        type: Number 
    },
    advanceApprovalDate:
    {
        type:Date
    },
    adminRemark:
    {
        type:String
    },
    advancePaymentMode:
    {
        type:String
    },
    advancePaymentModeId:
    {
        type:String
    },
    advanceChequeNumber:
    {
        type:String
    },
    advancePaymentDate:
    {
        type:Date
    }
});
 

var TravelAdvance= module.exports = mongoose.model('TravelAdvance', TravelAdvanceSchema);

