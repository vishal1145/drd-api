var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
      createdTime : 
    { 
        type : Date, default: Date.now 
    },
    vendorId:{
        type:String,
        required:true
    },
    vendorName: 
    {
        type: String,
        required: true
    },
     clientId:
    {
        type:String  
    },
    pnr : 
    {
        type: String
    },
    operator:{
        type: String
    },   
    ticketFare: 
    {
    type: Number
    },
    comments:{
        type:Boolean
    },
    ticketUrl:{
        type: String
    },
     isDocUploaded: 
    {
        type: Boolean ,
        default:false
    },
    tripId : 
    {
        type: String
    },
    ticketDate:
    {
        type:Date
    }
    
    
});
 

var Ticket= module.exports = mongoose.model('Ticket',TicketSchema);


