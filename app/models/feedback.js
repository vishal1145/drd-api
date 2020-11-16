var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({

    userId :
    {
       type: String,
    },
   
    userName:
    {
        type:String,
    },
    
    feedbackValue:{
        type:String,
    },
    created_at: 
    {
        type:Date,
        default:Date.now
    },
   
});
 

var Feedback= module.exports = mongoose.model('Feedback', FeedbackSchema);

module.exports.addFeedback = function(feedback, callback){
    Feedback.create(feedback, callback);
};