var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
   trpId:{
     type:String
   },
    createdTime : 
    { 
        type : Date, default: Date.now 
    },
    clientId:
    {
        type:String  
    },
    clientName:
    {
        type:String
    },
    hodId:{
      type:String  
    },
    userId: 
    {
        type: String,
        required: true
    },
    userName: 
    {
        type: String
    },
    fromCityId : 
    {
        type: String,
        required: true 
    },
    toCityId :
    {
       type: String  
    },
    fromCity: 
    {
        type: String  
    },
    toCity: 
    {
    type: String
    },
    adminRemark:{
        type: String
    },
  
    travelModeName:{
        type: String
    },
    travelModeId:{
        type:String
    },
    travelOperatorName:{
        type:String
    },
    clientPlanName:{
        type:String
    },
    isReimbursible:{
        type:Boolean
    },
    hodRemark:{
        
        type:String
    },
    employeeRemark:{
        type:String
    },
    
    
    travelPurpose:{
        type:String
    },
    travelPurposeId:{
        type:String
    },
    tripStatus:{
        type:String,
        default:"pending-hod"
    },
    tripStatusId:{
        type:String
    },
    tripStartDate:{
        type:Date
    }
    ,tripEndDate:{
        type:Date
    },
    totalAmountEmployee:{
    type:Number,
        default:0
},
totalAmountEmployeeR:{
    type:Number,
        default:0
},
    totalAmountEmployeeNR:{
    type:Number,
        default:0
},
    totalAmountAdmin:{
    type:Number,
        default:0
},
    totalAmountAdminR:{
    type:Number,
        default:0
},
    totalAmountAdminNR:{
    type:Number,
        default:0
},
    travelExpensesEmployeeTotal:{
        type:Number,
        default:0
    }
    ,
    travelExpensesEmployeeR:{
        type:Number,
        default:0
    },
    travelExpensesEmployeeNR:{
        type:Number,
        default:0
    },
    lodgingExpensesEmployeeTotal:{
        type:Number,
        default:0
    },
     lodgingExpensesEmployeeR:{
        type:Number,
        default:0
    },
     lodgingExpensesEmployeeNR:{
        type:Number,
        default:0
    },
     otherExpensesEmployeeTotal:{
        type:Number,
        default:0
    },
     otherExpensesEmployeeR:{
        type:Number,
        default:0
    },
     otherExpensesEmployeeNR:{
        type:Number,
        default:0
    },
    travelExpensesAdminTotal:{
        type:Number,
        default:0
    },
    travelExpensesAdminR:{
        type:Number,
        default:0
    },
    travelExpensesAdminNR:{
        type:Number,
        default:0
    },
    lodgingExpensesAdminTotal:{
        type:Number,
        default:0
    },
    
     lodgingExpensesAdminR:{
        type:Number,
        default:0
    },
    lodgingExpensesAdminNR:{
        type:Number,
        default:0
    },
    otherExpensesAdminTotal:{
        type:Number,
        default:0
    },
    otherExpensesAdminR:{
        type:Number,
        default:0
    },
    otherExpensesAdminNR:{
        type:Number,
        default:0
    },
    penaltyAmount:{
        type:Number,
        default:0
    },
    netPayable:{
        type:Number
    },
    isClosed:
    {
        type:Boolean,
        default:false
    },
    isMealPlanOpted:
    {
        type:Boolean
    },
    mealPlanId:
    {
        type:String
    },
    travelPolicyId:
    {
        type:String
    },
    isAdvanceRequested:
    {
        type:Boolean,
        default:false
    },
    hotelId:{
        type:String
    },
    budgetFrom:{
        
        type :Number
    },
    budgetTo:{
        
        type:Number
    },
    tourType:{
        type:String
    },
    travelClass:{
        
        type:String
    },
    travelTimefrom:{
        type:String
    },
    travelTimeto:{
        type:String
    },
    isVendorRequested:{
        type:Boolean,
        default:false
    },
    isCancelled:{
        type:Boolean,
        default:false
    }
    ,idHodApproved:{
        type:Boolean,
        default:false
    },
    hodApprovedTime:{
        type:Date
    },
    hodRejectedTime:{
        type:Date
    }
     ,idAdminApproved:{
        type:Boolean,
        default:false
    },
    adminApprovedTime:{
        type:Date
    },
    adminRejectedTime:{
        type:Date
    },
    selectedVendors:{
        type:[String],
        default:[]
    },
    vendorFares:{
        type:[]
    },
    cancellationComment:{
        type:String
    },
    travelNotes:{
        type:String
    },
    bookInfo:{
        type:[]
    },
    bookedTicket:{
         type:[]
    }
   
   
    
});
 

var Trip= module.exports = mongoose.model('Trip',TripSchema);

module.exports.addTrip = function(trip, callback){
   
    
	Trip.create(trip, callback);
};

module.exports.fetchRecent = function(userId, callback){
     
    
	  Trip.find({"userId":userId},callback);

};
