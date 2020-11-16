var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var baseUrl ="https://trippernew.s3.ap-south-1.amazonaws.com/" ;
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var methodOverride = require('method-override')
var cors = require('cors');
var config      = require('./config/database'); // get db config file
require('dotenv').config();
require( 'dotenv' ).load();
var path = require('path');
var port        = process.env.PORT || 80;
var Product        = require('./app/models/product'); 
var Category        = require('./app/models/category');
var Vendor        = require('./app/models/vendor');
var vendorCategory  = require('./app/models/vendorcategory'); 
var Trend        = require('./app/models/trend'); 
var Subscription        = require('./app/models/subscription'); 
var ActiveSubscription        = require('./app/models/subscriptionOrder');
var Store = require('./app/models/store');
var Laundry = require('./app/models/laundry');
var Feed = require('./app/models/feed');
var Trip        = require('./app/models/trip');
var User        = require('./app/models/user');
var Order        = require('./app/models/order');
var Doctor        = require('./app/models/doctor');
var Patient        = require('./app/models/patient');
var Clinic        = require('./app/models/clinic');
var Case        = require('./app/models/case');
var Slot        = require('./app/models/slot');
var Appointment        = require('./app/models/appointment');
var Prescription        = require('./app/models/prescription');
var Search        = require('./app/models/search'); 

var randomstring = require("randomstring");
var randomNumber = require('random-number');
var Insta = require('instamojo-nodejs');
var querystring = require('querystring');
var http = require('http');
const axios = require('axios');
var moment = require('moment');
var SubCategory        = require('./app/models/hotel');
var Prime =require('./app/models/prime');

app.use(cors());
const { PaymentGateway } = require('cashfree-sdk');

PaymentGateway.verifyCredentials({
    env: 'TEST',
 
    appId: '27102c9cf3de079b19529361120172',
    secretKey: '2e39c20d1aa43b72690059a42edc7fac868b0e15',
  })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

// Instantiate Cashfree Gateway

const pg = new PaymentGateway({
    env: 'TEST',
    apiVersion: '1.0.0',
    appId: '27102c9cf3de079b19529361120172',
    secretKey: '2e39c20d1aa43b72690059a42edc7fac868b0e15',
  });


  
//insta credential

//multer

var multer = require( 'multer' );
var s3 = require( 'multer-storage-s3' );
var storage = s3({
    destination : function( req, file, cb ) {
        
        cb( null, '' );
        
    },
    filename    : function( req, file, cb ) {
        
        cb( null, randomstring.generate() +path.extname(file.originalname) );

        
    },
    bucket      : 'trippernew',
    region      : 'ap-south-1'
});
var uploadMiddleware = multer({ storage: storage });





var moment = require('moment');

 
  
  


  


function getNextSequence(name,fn) {
    var retseq=0;
   
    Id.findOneAndUpdate({_id: name}, {$inc: { seq: 1 }}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }

  
         retseq=doc.seq;
       
        fn(retseq);
     
});
   
}




Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var isEmpty=function (obj) {

    
    if (obj == null) return true;

    
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev'));
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept");
  next();
});

mongoose.connect("mongodb://root:EmyVfyP9pFZB@localhost/exp?authSource=admin", {useNewUrlParser: true});
// mongoose.connect(config.database);
// pass passport for configuration

route = require('./routes/routes');
var apiRoutes = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets/images'));
 app.use(express.static('uploads'));


app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, './public', 'index.html'));
   
    });
        
// connect the api routes under /api/*
app.use('/api', apiRoutes);

 
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

apiRoutes.get('/users/', function(req, res){
	 
  
    User.find(function(err, user) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.json(err);
            }
                
    else
        {
              res.json({success: true,users: user}); // return all todos in JSON format
        }
          
        });
    

});


// apiRoutes.get('/profile', function(req, res){
//         var token = req.query.Authorization;
//         var userId=req.query.userId;
//         var isauth= route.memberinfo(token,userId);
//         token= "JWT "+token;
//         var userRole=req.query.userRole;
//         if(isauth){
            
//             if (userRole=='superadmin')
//             {
//                 Trip.find({adminRemark:"xyz"},function(err, trip) {
// console.log(trip);
//                     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//                     if (err){
//                         res.send(err);
//                     }
                        
//             else
//                 {
//                       res.json({success: true,trip: trip}); // return all todos in JSON format
//                 }
                  
//                 });

//             }
//             else{
                    
//                 Trip.find({'userId':userId},function(err, trip) {

//                     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//                     if (err){
//                         res.send(err);
//                     }
                        
//             else
//                 {
//                       res.json({success: true,trip: trip}); // 
//                 }
                  
//                 });

//             }
           
//     }
//     else{
//         res.json({success: false,msg:'No Authentication Token Present'});
//     }
// });



//CASHFREE HERE

apiRoutes.post('/orderBuy', function(req, res){ 
    var orderId=req.body.orderId;
    var orderAmount =req.body.orderAmount;
    var orderCurrency =req.body.orderCurrency;
    var orderNote =req.body.orderNote;
    var customerName =req.body.customerName;
    var customerEmail =req.body.customerEmail;
    var customerPhone =req.body.customerPhone;

    var appId= '27102c9cf3de079b19529361120172';
    var secretKey= '2e39c20d1aa43b72690059a42edc7fac868b0e15';
   
    var dataParam ={
        orderId: orderId, // required
        orderAmount: orderAmount, // required
        orderCurrency: orderCurrency,
        orderNote: orderNote,
        customerName: customerName, // required
        customerPhone: customerPhone, // required
        customerEmail: customerEmail, // required
        sellerPhone: '',
        returnUrl: 'http://13.232.66.57/api/paymentSuccess', // required
        notifyUrl: 'https://example.com/notify',
        paymentModes: '',
        pc: '',
    }  

    axios
.post('https://fcm.googleapis.com/fcm/send', function(dataParam, callback){
console.log(dataParam);
console.log("Above is data param check");
console.log(callback);
console.log("Above is callback check");
});



		
// pg.orders
//   .createOrders({
    
//     orderId: orderId, // required
//     orderAmount: orderAmount, // required
//     orderCurrency: orderCurrency,
//     orderNote: orderNote,
//     customerName: customerName, // required
//     customerPhone: customerPhone, // required
//     customerEmail: customerEmail, // required
//     sellerPhone: '',
//     returnUrl: 'http://13.232.66.57/api/paymentSuccess', // required
//     notifyUrl: 'https://example.com/notify',
//     paymentModes: '',
//     pc: '',
//   })
//   .then((data) => {
//     console.log(data);
   
//     slotData={
//         userFcm:orderNote,
//         orderId:orderId
//     }

//     console.log(slotData);
//     console.log("HEYyyyyyyyyyyyyyyyyyyyyy");
//     Slot.addSlot(slotData,function(err, slot){
//         if(err){
//             console.log(err);
//             res.json({success: false, msg: 'Failed to add Request'});
//         //	throw err;
//         }
//         else{
//             res.json({success:true,msg:"Order Created",res:data});
//         }
//     });
  
//   })
//   .catch((error) => {
//     console.error(error)
//     res.json({success:false,msg:"Order Not Created",res:error});
//   });

});

//CASHFREE END

apiRoutes.post('/paymentSuccess', function(req, res){ 
console.log(req);
var orderId = req.body.orderId;
var txStatus = req.body.txStatus;

Slot.findOne({'orderId':orderId},function(err,slotDetail){
    if(err){
        console.log(err);
    }else{
        var slotDetails = slotDetail;
        console.log(slotDetails);
        console.log("HEYyyyyyyyyyyyyyyyyyyyyy SLOOOOOTTT DETTTTTAAAAILLLLL");
var userFcm = slotDetails.userFcm;
axios
.post('https://fcm.googleapis.com/fcm/send', {
  "notification":{
    "title":"",
    "body":"",
    "sound":"default",
    "click_action":"FCM_PLUGIN_ACTIVITY",
    "icon":"fcm_push_icon"
  },
  "data":{
 
    "status":txStatus
  },
    "to":userFcm,
    "priority":"high",
    "restricted_package_name":""
},
{
  headers: {
   'Content-Type':'application/json',
    'Authorization': 'key=AAAAWVWw9dA:APA91bEp-cmROqHRXciyYYCT-17gAmjugU5IyaaanobxlKGvyml37gtd5ef0I041Z8iUAEzLMhLDZC7Np4clRzNfBtdwSWo9Zfo7TDREA8rW44W-GHNEnbDslaS7ryItES59P2cgswJp' 
  }
})
.then(res => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch(error => {
  console.error(error)
})

    }
 

})

  

});


//api multer
apiRoutes.post( '/addProduct', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var product = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var productData = {
        
        productVendorId:product.productVendorId,        
        productVendorName:product.productVendorName,    
        productName: product.productName,
        productCost:product.productCost,
        productsell:product.productSell,
        productQuantity:product.productQuantity,
        categoryId:product.productCategoryId,
        categoryName: product.productCategory,
        productUrl:baseUrl+req.file.filename,
        productSubCategoryId:product.productSubCategoryId,
        productSubCategory:product.productSubCategory

    }


    console.log("tester"+JSON.stringify(req.body));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Product.addProduct(productData,function(err, productData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Product Added Successfully',data:productData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});


apiRoutes.post('/addProduct1', function(req, res){
    

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var product = req.body;
    var categoryName = req.body.productcategoryId.categoryName;
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    
    var productData = {
        productName: product.productName,
        productCost:product.productCost,
        productsell:product.productSell,
        productQuantity:product.productQuantity,
        categoryId:product.productcategoryId._id,
        categoryName:categoryName

    }


    console.log("tester"+JSON.stringify(req.body));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Product.addProduct(productData,function(err, productData){
        if(err){
            
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Product Added Successfully',data:productData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }
});



//Add Product Category

apiRoutes.post('/category',  uploadMiddleware.single('attachment'),  function( req, res, next ){

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var category = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
   var categoryData = {
    categoryVendorId:category.categoryVendorId,        
    categoryVendorName:category.categoryVendorName, 
    categoryName:req.body.categoryName,   
    categoryUrl:baseUrl+req.file.filename,
    
   }
    

    console.log("tester"+JSON.stringify(req.body));

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Category.addCategory(categoryData,function(err, cat){
        if(err){
            
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Category Added Successfully',data:cat});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Category Token Authentication failed'});
 }
});

apiRoutes.post('/brand',  uploadMiddleware.single('attachment'), function(req, res){

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var brand = req.body;
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
   var brandData = {
    brandName:req.body.brandName,   
    brandUrl:baseUrl+req.file.filename,
   };
    

    console.log("tester"+JSON.stringify(req.body));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Brand.addBrand(brandData,function(err, br){
        if(err){
            
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Brand Added Successfully',data:br});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Brand Token Authentication failed'});
 }
});

//changes Shift Project

// add search key api

apiRoutes.post( '/addSearchTerm', function( req, res, next ) {
    // var token = getToken(req.headers);
    // var userId=req.body.userId;
    var search = req.body;
    // var password = req.body.password;
    // var randomstring2 = require("randomstring");
    var searchData = {
        // doctorId :search.doctorId,
        searchTerm: search.searchTerm,
        category: search.category

    }
    Search.addSearch(searchData,function(err, searchData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        }
        else{
            res.json({success:true,msg:'Search Added Successfully',data:searchData});
        }
    });
});


// get search term

apiRoutes.post('/getSearchTerm', function(req, res){                  
                Search.find({},function(err, searchData) {          
                    if (err){
                        console.log("error");
                        console.log(err);
                        res.json({success: false, msg: 'Unable To Fetch Searchterm',res:err});
                    }else{   
                        res.json({success: true, msg: 'Searchterm Request Sent Successfully',data:searchData});
                        console.log(searchData);
                    }
                });    
            
        }); 

//add doctor api

apiRoutes.post( '/addDoctor', uploadMiddleware.single('attachment'), function( req, res, next ) {
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var doctor = req.body;
    var password = req.body.password;
    var randomstring2 = require("randomstring");
    var doctorData = {
        doctorId :randomstring2.generate(8),
        doctorName: doctor.doctorName,
        doctorMobile:doctor.doctorMobile,
        doctorEmailId:doctor.doctorEmailId,
        doctorAddress:doctor.doctorAddress,
        doctorSpeciality:doctor.doctorSpeciality,
        doctorExperience:doctor.doctorExperience,
        password:password

    }
    Doctor.addDoctor(doctorData,function(err, doctorData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        }
        else{
            res.json({success:true,msg:'Doctor Added Successfully',data:doctorData});
        }
    });
});

// get doctor api

// apiRoutes.post('/getDoctor', function(req, res){ 
//     var contactNum=req.body.contactNum;
//     console.log(contactNum); 
//     if(contactNum!=undefined){
//         Doctor.findOne({ 'contactNum': contactNum }, function(err, doctor) {       
//             if(!doctor){
//                 res.json({success: false, msg: 'No User with this Contact Number exist'});
//             }             
//              else           
//              {               
//                 Doctor.find(function(err, doctorData) {          
//                     if (err){
//                         console.log("error");
//                         console.log(err);
//                         res.json({success: false, msg: 'Unable To Fetch Doctor',res:err});
//                     }else{   
//                         res.json({success: true, msg: 'Doctor Request Sent Successfully',data:doctorData});
//                         console.log(doctorData);
//                     }
//                 });    
//             }
//         }); 
//     }
//     else{
//         res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
//     }
// });

apiRoutes.post('/getDoctor', function(req, res){ 
    var contactNum=req.body.contactNum;
    console.log(contactNum); 
    if(contactNum!=undefined){
        Doctor.findOne({ 'doctorMobile': contactNum }, function(err, doctor) {       
            if(doctor){
                res.json({success: true, msg: 'Doctor Request Sent Successfully',data:doctor});
                        console.log(doctor);
            }             
             else{      
                 console.log(err);
                 res.json({success: false, msg: 'Unable To Fetch Doctor',res:err});
                }                 
            
        });    
}else{
    res.json({success: false,msg:'No doctor with this Contact Number exist'});
}
     });




// get doctor for patient api

apiRoutes.post('/getDoc', function(req, res){ 
        Doctor.find({},function(err, doctor) {          
            if (err){
                console.log("error");
                console.log(err);
                res.json({success: false, msg: 'Unable To Fetch Doctor',res:err});
            }else{   
                res.json({success: true, msg: 'Doctor Request Sent Successfully',data:doctor});
                console.log(doctor);
            }
        });  
});



//update doctor api

apiRoutes.post('/updateDoctorProfile', function(req, res){
    // var token = getToken(req.headers);
   var doctorId=req.body.doctorId;   
   var doctorName = req.body.doctorName;
   var doctorAddress = req.body.doctorAddress;
   var doctorMobile = req.body.doctorMobile;
   var doctorAdhaarNumber = req.body.doctorAdhaarNumber;
   var doctorPincode = req.body.doctorPincode;
   var doctorGender = req.body.doctorGender   
   // var isauth= route.memberinfo(token,userId);   
   if(doctorId){
       Doctor.update({'_id':doctorId}, { $set:{
           "doctorName":doctorName,
           "doctorAddress":doctorAddress,
           "doctorMobile":doctorMobile,
           "doctorAdhaarNumber":doctorAdhaarNumber,
           "doctorPincode":doctorPincode,
           "doctorGender":doctorGender,
       }}, function(err, numberAffected, rawResponse) {
          //handle it
                   if(err){
                       console.log(err);
                   res.json({success: false,msg:'Doctor Failed To Update'});
                   throw err;
               }
                   else{

                    Doctor.findOne({'_id':doctorId},function(err,doctor){
                        if(err){
                            console.log(err);
                        }else{
                            res.json({success: true,msg:'Patient Updated Successfully',data:doctor});
                        }
                    })
                        
                    //    res.json({success: true,msg:'Doctor Updated Successfully',data:doctor});
                   }
       });
   
   }
   else{
       res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
   }
});

//update patient api

apiRoutes.post('/updatePatientProfile', function(req, res){
    // var token = getToken(req.headers);
    // var patientId=req.body.patientId;   
   var userId=req.body.userId;
   var patientName = req.body.patientName;
   var patientAddress = req.body.patientAddress;
   var patientEmailId = req.body.patientEmailId;
   var patientAdhaarNumber = req.body.patientAdhaarNumber;
   var patientZipcode = req.body.patientZipcode;
   var patientGender = req.body.patientGender;  
   // var isauth= route.memberinfo(token,userId);   
   if(userId){
       User.update({'_id':userId}, { $set:{
           "patientName":patientName,
           "patientAddress":patientAddress,
           "emailId":patientEmailId,
           "emailIdRegistered":true,
           "patientAdhaarNumber":patientAdhaarNumber,
            "patientZipcode":patientZipcode,
           "patientGender":patientGender,
       }}, function(err, numberAffected, rawResponse) {
          //handle it
                   if(err){
                       console.log(err);
                   res.json({success: false,msg:'Patient Failed To Update'});
                   throw err;
               }
                   else{

                    User.findOne({'_id':userId},function(err,user){
                        if(err){
                            console.log(err);
                        }else{
                            res.json({success: true,msg:'Patient Updated Successfully',data:user});
                        }
                    })
                        
                       
                   }
       });
   
   }
   else{
       res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
   }
});




// get patient api

apiRoutes.post('/getPatient', function(req, res){ 
    var contactNum=req.body.contactNum;
    console.log(contactNum); 
    if(contactNum!=undefined){
        User.findOne({ 'contactNum': contactNum }, function(err, user) {       
            if(user){
                res.json({success: true, msg: 'Patient Request Sent Successfully',data:user});
                        console.log(user);
            }             
             else{      
                 console.log(err);
                 res.json({success: false, msg: 'Unable To Fetch Patient',res:err});
                }                 
            
        });    
}else{
    res.json({success: false,msg:'No User with this Contact Number exist'});
}
     });



// add patient api

apiRoutes.post( '/addPatient', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var patient = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var randomstring2 = require("randomstring");
    var patientData = {
        patientId :randomstring2.generate(8),
        patientName: patient.patientName,
        patientMobile:patient.patientMobile,
        patientEmailId:patient.patientEmailId,
        patientAddress:patient.patientAddress,
        patientDob:patient.patientDob,
        patientAdhaar:patient.patientAdhaar,
        patientUrl:baseUrl+req.file.filename

    }

    console.log("tester"+JSON.stringify(req.body));

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Patient.addPatient(patientData,function(err, patientData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Patient Added Successfully',data:patientData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});

// appointment api

apiRoutes.post( '/bookAppointment',  function( req, res, next ) {

 
    // var token = getToken(req.headers);
    var appointment = req.body;
    var userId=appointment.patienId;

   
    var slotArray = JSON.parse(appointment.slotArray);
    console.log(slotArray);
    console.log("slot Array");
    console.log(appointment);
    
    User.findOne({'_id':userId},function(err,user){
        if(err){

        }else{
        
          
            Slot.findOneAndUpdate({'clinicId':appointment.clinicId,'date':appointment.appointmentDate},{ $set:{
                "slotTimings":slotArray
                
            }}, function(err, numberAffected, rawResponse,clinicData) {
                if(err){
        
                }else{

                    console.log(clinicData);
                    console.log("CHECK FINAL SLOT ARRAY BEFORE UPDATE");
                    console.log("goes HEre")
                    var randomstring2 = require("randomstring");
                    var appointmentData = {
                     
                        appointmentId:randomstring2.generate(5),
                        appointmentDate:appointment.appointmentDate,
                        clinicId:appointment.clinicId,
                        clinicName:appointment.clinicName,
                        clinicAddress:appointment.clinicAddress,
                        doctorId:appointment.doctorId,
                        doctorName: appointment.doctorName,
                        doctorMobile:appointment.doctorMobile,
                        patientId:appointment.patientId,
                        patientName: appointment.patientName,
                        patientMobile:appointment.patientMobile,
                        appointmentStartTime:appointment.appointmentStartTime,  
                        appointmentEndTime:appointment.appointmentEndTime,
                        isOnlineAppointment:appointment.isOnlineAppointment
                    };
                    
                
                 
                
                //  var isauth= route.memberinfo(token,userId);
                
                //  if(isauth){
                
                    Appointment.addAppointment(appointmentData,function(err, appointmentData){
                        if(err){
                            console.log(err);
                            res.json({success: false, msg: 'Failed to add Request'});
                        //	throw err;
                        }
                        else{
                            var allAppointment=[];
                            for(var i=0;i<=appointmentData.length;i++){
                                var date=appointmentData[i].appointmentDate;
                                var appDate=moment(date).format("DD-MM-YYYY");
                                appointmentData[i].appStyleDate=appDate;
                                allAppointment.push(appointmentData[i]);
                            }
                            res.json({success:true,msg:'Appointment Booked Successfully',data:appointmentData});
                        }
                    });
                }
            })
        }
    })
    
   

});



// create slot api

apiRoutes.post( '/createSlot',  function( req, res, next ) {
    // var token = getToken(req.headers);
    // var userId=req.body.userId;
    var slotArr = JSON.parse(req.body.slotDetails);
    console.log('heyyyyyyyyyyyyyyy');
    console.log(slotArr);    
    var docterId=req.body.docterId;
    var slotArrLength = slotArr.length;
    console.log("hey here " + slotArrLength);
    for(var i=0;i<slotArr.length;i++){
        if(i==slotArr.length - 1){
            console.log("SHOULD COME ONLY ONCE")
            var clinicId=slotArr[i].clinicId;
            var date=slotArr[i].date;
            var day=slotArr[i].day;
            var slotTimings=slotArr[i].slotTimings;
            var slotData = {
                doctorId:docterId,
                clinicId:clinicId,
                date:date,
                day:day,
                slotTimings:slotTimings
            };
        
            Slot.addSlot(slotData,function(err, slotData){
                if(err){
                    console.log(err);
                    res.json({success:false,data:err});
                }
                else{
                    res.json({success:true,data:slotData});
                }
            });            
        }else{
            console.log("going in else")
            var clinicId=slotArr[i].clinicId;
            var date=slotArr[i].date;
            var day=slotArr[i].day;
            var slotTimings=slotArr[i].slotTimings;
            var slotData = {
                doctorId:docterId,
                clinicId:clinicId,
                date:date,
                day:day,
                slotTimings:slotTimings
            };
        
            Slot.addSlot(slotData,function(err, slotData){
                if(err){
                    console.log(err);
                    
                //	throw err;
                }
                else{
                    console.log('data saved');
                }
            });  
        }
       
    }

});

// get slot api

apiRoutes.post('/getSlot' , function(req,res){
    var clinicId=req.body.clinicId;
    var slotDate=req.body.slotDate;
    console.log(clinicId);
    console.log(slotDate);
    // var token=req.body.token;
    // var isauth= route.memberinfo(token,docterId);
    // token= "JWT "+token;
    if(clinicId){
        Slot.findOne({'clinicId':clinicId,'date':slotDate},function(err,slot)       
        {
            if(err){
                console.log('heyyyyyyyyyyyyyyyy errorrrrrrrrrrrrrrr');
                console.log(err);
                res.json({success:false,msg:'Unable to fetch Slot'});
            }else{
                console.log('workssssssssssssssssss');
                res.json({success:true,data:slot});
                console.log(slot);
            }           
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});


// Cancel Appointment api

apiRoutes.post('/cancelAppointment', function(req, res){
	  

    // var userId=req.body.userId;
    // var token=req.body.tokenstr;
    // console.log("HEY THIS IS TOKEN "+token);
    var appointmentId = req.body.appointmentId;
    var slotId = req.body.slotId;
    var slotArray = JSON.parse(req.body.slotArray);
    console.log(appointmentId + " this is appointment id ");
    // var status = req.body.status;
    
    
    
    
    // var isauth= route.memberinfo(token,userId);

    if(slotId){
        Slot.findOneAndUpdate({'_id': slotId}, { $set:{
            "slotTimings":slotArray 
            
        }}, function(err, numberAffected, rawResponse,slotData) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Slot Failed To Update'});
           
                }
                    else{
                        if(appointmentId){
                            console.log(appointmentId);
                            Appointment.update({'_id': appointmentId}, { $set:{
                                "isCancelled":true 
                                
                            }}, function(err, numberAffected, rawResponse,appointmentData) {
                               //handle it
                                        if(err){
                                            console.log(err);
                                        res.json({success: false,msg:'Appointment Failed To Update'});
                                        throw err;
                                    }
                                        else{
                                            console.log(appointmentData);
                                            res.json({success: true,msg:'Appointment Updated Successfully',data:appointmentData,slotData:slotData});
                                        }
                            });
                    
                          
                         
                           
                        }
                        else{
                            res.json({success: false,msg:'No appointment Id'});
                        }
                  
                    }
        }); 
    }else{
        res.json({success: false,msg:'No slot id'});
    }
    
   

});

// get all Doctor appointment

apiRoutes.post('/getAllDoctorAppointment' , function(req,res){

    var doctorId=req.body.doctorId;
    console.log(doctorId);
    // var token=req.body.token;
    // var isauth= route.memberinfo(token,docterId);
    // token= "JWT "+token;
    

    if(doctorId){
        Appointment.find({doctorId:doctorId},function(err,appointment)
        
        {
            if(err){
                res.json({success:false,msg:'Unable to fetch appointment'});
            }else{
                res.json({success:true,data:appointment});
            }
            
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});

// get all Patient appointment

apiRoutes.post('/getAllPatientAppointment' , function(req,res){

    var patientId=req.body.patientId;
    // var token=req.body.token;
    // var isauth= route.memberinfo(token,patientId);
    // token= "JWT "+token;
    

    if(patientId){
        Appointment.find({patientId:patientId},function(err,appointment)
        
        {
            if(err){
                res.json({success:false,msg:'Unable to fetch appointment'});
            }else{
                console.log(appointment);
                res.json({success:true,data:appointment});
            }
            
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});


// clinic api

apiRoutes.post( '/addClinic',  function( req, res, next ) {
    // var token = getToken(req.headers);
    var doctorId=req.body.doctorId;
    console.log(doctorId);
    var clinic = req.body;
    
    // var isauth= route.memberinfo(doctorId);
    // console.log(isauth);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    // console.log("This is file name"+req.file.filename);
    var randomstring2 = require("randomstring");
    var clinicData = {
        clinicId :randomstring2.generate(8),
        clinicName:clinic.clinicName,
        clinicAddress:clinic.clinicAddress,
        doctorId:clinic.doctorId,
        doctorName: clinic.doctorName,
        doctorMobile:clinic.doctorMobile
    }

    console.log("tester"+JSON.stringify(req.body));

//  var isauth= route.memberinfo(doctorId);

//  if(isauth){

    Clinic.addClinic(clinicData,function(err, clinic){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Clinic Added Successfully',data:clinic});
        }
    });
    // }
});

//Get Slots
apiRoutes.post( '/getClinicSlot',  function( req, res, next ) {
    
  
   
    var clinicId = req.body.clinicId;
    var isDoctor= req.body.isDoctor;
   if(isDoctor){
    var doctorId=req.body.doctorId;
    console.log(doctorId);
       Doctor.findOne({'_id':doctorId},function(err,doctor){
           if(err){
            res.json({success: false, msg: 'User Not Authorized'});
           }else{
            Clinic.findOne({_id:clinicId},function(err, clinic){
                if(err){
                    console.log(err);
                    res.json({success: false, msg: 'Failed to Fetch Clinic Request'});
           
                }
                else{
                    res.json({success:true,msg:'Clinic Fetched Successfully',data:clinic});
                }
            });
           }
       })
   }else{
    var userId=req.body.userId;
    console.log(doctorId);
    User.findOne({'_id':userId},function(err,user){
        if(err){
         res.json({success: false, msg: 'User Not Authorized'});
        }else{
         Clinic.findOne({_id:clinicId},function(err, clinic){
             if(err){
                 console.log(err);
                 res.json({success: false, msg: 'Failed to Fetch Clinic Request'});

        
             }
             else{


                res.json({success: false, msg: 'Clinic Fetched Successfully',data:clinic});

             }
         });
        }
    })
   }
   





   

});

apiRoutes.post( '/addSlots',  function( req, res, next ) {
    // var token = getToken(req.headers);
    var doctorId=req.body.doctorId;
    console.log(doctorId);
    var clinicId=req.body.clinicId;
    console.log(clinicId);
    var clinicDetails = req.body;
    //Slot Details obj
    var newSlot = clinicDetails.slotDetails
    var slot = JSON.parse(newSlot);
    Doctor.findOne({'_id':doctorId},function (err,doctor){
        if(err){
            res.json({success: false, msg: 'Invalid User Id'});
        }else{
            Clinic.findOne({'_id':clinicId},function (err,clinic){
                if(err){
                    res.json({success: false, msg: 'Invalid Clinic Id'});
                }else{
                    // var clinicSlot=clinic.slots;
                    var slotArray = [];

                    var slotArray = clinic.slots;
                    slot.forEach(element => {
                        slotArray.push(element);
                    });
                    // slotArray.push(slot);
                    console.log(slotArray);
                    console.log("Check above HEEEEEEERERERERERER")
                    // slotArray.push(slot);

                    // console.log(slotArray);
                    Clinic.update({'_id': clinicId}, { $set:{
                        'slots':slotArray,
                        }}, function(err, numberAffected, rawResponse) {
                       //handle it
                                if(err){
                                    res.json({success: false, msg: 'Unable to update'});   
                                }else{
                                    Clinic.findOne({'_id':clinicId},function (err,clinic){
                                        if(err){
                                            res.json({success: false, msg: 'Invalid Clinic Id'});
                                        }else{
                                    res.json({success: true, msg: 'Slot Updated',data:clinic});  
                                }
                            
                            })
                        }
            })
        }
    })
   
        }
    });
});
// get all clinic

apiRoutes.post('/getAllClinic' , function(req,res){

    var doctorId=req.body.doctorId;
    // var token=req.body.token;
    // var isauth= route.memberinfo(clinicId);
    // console.log(isauth);
    // token= "JWT "+token;
    

    if(doctorId){
        Clinic.find({'doctorId':doctorId},function(err,clinic)
        
        {
            if(err){
                res.json({success:false,msg:'Unable to fetch Clinic'});
            }else{
                res.json({success:true,data:clinic});
            }
            
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});

// cases api

apiRoutes.post( '/addCase',  function( req, res, next ) {

    // var token = getToken(req.headers);
    // var userId=req.body.userId;
    var cases = req.body;
    
    // var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    // console.log("This is file name"+req.file.filename);
    // var randomstring2 = require("randomstring");
    var caseData = {
        // caseId :randomstring2.generate(8),
        appointmentDate:cases.appointmentDate,
        clinicName:cases.clinicName,
        patientName: cases.patientName,
        patientMobile:cases.patientMobile,
        doctorName: cases.doctorName,
        doctorMobile:cases.doctorMobile,
        caseStatus:cases.caseStatus,
        caseSubject:cases.caseSubject
    }

    console.log("tester"+JSON.stringify(req.body));

//  var isauth= route.memberinfo(token,userId);

//  if(isauth){

    Case.addCase(caseData,function(err, caseData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Case Added Successfully',data:caseData});
        }
    });
    
//  }
//  else{
//      res.json({success: false,msg:'Failed to update Token Authentication failed'});
//  }

});

//prescription api

apiRoutes.post( '/addPrescription',  function( req, res, next ) {

    // var token = getToken(req.headers);
    var userId=req.body.userId;
    var prescription = req.body;
    var medicines = JSON.parse(prescription.medicines);
    var medTime=JSON.parse(prescription.medicineHour);
    
    // var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    // console.log("This is file name"+req.file.filename);
    var randomstring2 = require("randomstring");
    var prescriptionData = {
        prescriptionId:randomstring2.generate(6),
        patientId :userId,
        symptoms:prescription.symptoms,
        remark:prescription.remark,
        prescriptionData:medicines,
        appointmentDate:prescription.appointmentDate,
        patientName: prescription.patientName,
        patientAge: prescription.patientAge,
        patientHeight: prescription.patientHeight,
        patientWeight: prescription.patientWeight,
        patientBp: prescription.patientBp,
        patientPulse: prescription.patientPulse,
        patientMobile:prescription.patientMobile,
        doctorName: prescription.doctorName,
        doctorMobile:prescription.doctorMobile,
        doctorId:prescription.doctorId,
        medicineHour:medTime,
        medicineDose:prescription.medicineDose,
        medicineTime:prescription.medicineTime
    }

    console.log("tester"+JSON.stringify(req.body));

//  var isauth= route.memberinfo(token,userId);
Doctor.findOne({'_id':prescription.doctorId},function(err, doctor){
if(err){
    res.json({success: false,msg:'TokenAuth Failed'});
}else{
    Prescription.addPrescription(prescriptionData,function(err, prescriptionData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Prescription Added Successfully',data:prescriptionData});
        }
    });
    
}
});
 

});

// update prescription

apiRoutes.post('/updatePrescription', function(req, res){
    // var token = getToken(req.headers);
   var doctorId=req.body.doctorId;   
   var doctorName = req.body.doctorName;
   var doctorMobile = req.body.doctorMobile;
   var remark = req.body.remark;
   var medicines = JSON.parse(req.body.medicines);
   var medTime=JSON.parse(req.body.medicineTime);
   var medicineDose=req.body.medicineDose;
//    var doctorAddress = req.body.doctorAddress;
//    var doctorAdhaarNumber = req.body.doctorAdhaarNumber;
//    var doctorPincode = req.body.doctorPincode;
//    var doctorGender = req.body.doctorGender   
   // var isauth= route.memberinfo(token,userId);   
   if(doctorId){
       Prescription.update({doctorId:doctorId}, { $set:{
        //    "doctorName":doctorName,
           "prescriptionData":medicines,
           "remark":remark,
           'medicineTime':medTime,
           'medicineDose':medicineDose

       }}, function(err, numberAffected, rawResponse) {
          //handle it
                   if(err){
                       console.log(err);
                   res.json({success: false,msg:'Prescription Failed To Update'});
                   throw err;
               }
                   else{
                        
                       res.json({success: true,msg:'Prescription Updated Successfully'});
                   }
       });
   
   }
   else{
       res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
   }
});


//Get prescription Patient

apiRoutes.post( '/getPrescription',  function( req, res, next ) {

    // var token = getToken(req.headers);
    var isDoctor = req.body.isDoctor;
    if(isDoctor){
        var doctorId=req.body.doctorId;
        Doctor.find({'_id':doctorId},function(err,doctor){
            if(err){
                console.log(err);
            }else{
                Prescription.find({'doctorId':doctorId},function(err, prescriptionData){
                    if(err){
                        console.log(err);
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                    else{
                        res.json({success:true,msg:'Prescription Fetched Successfully',data:prescriptionData});
                    }
                });
            }
        })
    }else{
        var userId=req.body.userId;
        var contactNum = req.body.contactNum;
        User.findOne({'_id':userId},function(err, user){
            if(err){
                res.json({success: false,msg:'TokenAuth Failed'});
            }else{
                Prescription.find({'patientMobile':contactNum},function(err, prescriptionData){
                    if(err){
                        console.log(err);
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                    else{
                        res.json({success:true,msg:'Prescription Fetched Successfully',data:prescriptionData});
                    }
                });
                
            }
            });
    }
  

});

//add lab api

apiRoutes.post( '/addLab', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var lab = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var labData = {
        labName: lab.labName,
        labTariff:lab.labTariff,
        labAddress:lab.labAddress,
        labContactNumber:lab.labContactNumber,
        labRemarks:lab.labRemarks,
        labUrl:baseUrl+req.file.filename

    }


    console.log("tester"+JSON.stringify(req.body));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Lab.addLab(labData,function(err, labData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Lab Added Successfully',data:labData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});

//add subcategory api

apiRoutes.post('/addSubCategory',  uploadMiddleware.single('attachment'),  function( req, res, next ){

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var category = req.body;
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
   var SubCat = {
    subCategoryVendorId:req.body.subCategoryVendorId,        
    subCategoryVendorName:req.body.subCategoryVendorName, 
    subCategoryName:req.body.subCategoryName,   
    imgUrl:baseUrl+req.file.filename,
   
    categoryVendorId:category.vendorCategoryId,
    categoryVendorName:category.vendorCategoryName,

   };
    

    console.log("tester"+JSON.stringify(SubCat));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    SubCategory.create(SubCat,function(err, subcat){
        if(err){
            
            res.json({success: false, msg: 'Failed to add Request'});
        	throw err;
        }
        else{
            res.json({success:true,msg:'SubCategory Added Successfully',SubCategory:subcat});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update SubCategory Token Authentication failed'});
 }
});
//changes end

apiRoutes.post('/addstore',  uploadMiddleware.single('attachment'),  function( req, res, next ){

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var store = req.body
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
   var storeD = {
    storeVendorId:store.storeVendorId,        
    storeVendorName:store.storeVendorName, 
    storeName:store.storeName,   
    storeUrl:baseUrl+req.file.filename,
    storeContactNumber:store.storeContactNumber,
    storeAddress:store.storeAddress
    

   };
    

    console.log("tester"+JSON.stringify(storeD));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Store.create(storeD,function(err, storeD){
        if(err){
            
            res.json({success: false, msg: 'Failed to add Request'});
        	throw err;
        }
        else{
            res.json({success:true,msg:'SubCategory Added Successfully',StoreD:storeD});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update SubCategory Token Authentication failed'});
 }
});
//changes end


apiRoutes.post( '/vendor', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var vendor = req.body;
    var vendorCategoryName = req.body.vendorCategoryId.vendorCategoryName;
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var vendorData = {
        vendorName: vendor.vendorName,
        vendorContactNumber:vendor.vendorContactNumber,
        vendorAddress:vendor.vendorAddress,
        vendorCategoryId:vendor.vendorCategoryId,
        vendorCategoryName:vendor.vendorCategoryName,
        
        
        vendorUrl:baseUrl+req.file.filename,
        

    }


    console.log("tester"+JSON.stringify(req.body));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Vendor.addVendor(vendorData,function(err, vendorData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Vendor Added Successfully',data:vendorData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});


//operator
//Add a bank
apiRoutes.post('/vendorCategory',  uploadMiddleware.single('attachment'),  function( req, res, next ){

    var token = getToken(req.headers);
    var userId=req.body.userId;
    // var vendorCategory = req.body;
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
   var vendorCategoryData = {
    vendorCategoryName:req.body.vendorCategoryName,   
    vendorCategoryUrl:baseUrl+req.file.filename
    
   }
    

    console.log("tester"+JSON.stringify(req.body));

 

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    vendorCategory.addvendorCategory(vendorCategoryData,function(err, vendorcat){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'Vendor Category Added Successfully',data:vendorcat});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Category Token Authentication failed'});
 }
});
//end

//Order
apiRoutes.post('/order', function(req, res){


    console.log("body"+req.body);
    var txamt=req.body.txAmt;
    
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
    var count = req.body.count;
    var selectedItems= req.body.selectedItems;
    var isauth= route.memberinfo(token,userId);
    var vendorId = selectedItems[0].productVendorId;
    token= "JWT "+token;

    var randomstring2 = require("randomstring");
       var cdata = {
        orderId :randomstring2.generate(8),
        orderDesc : selectedItems,
        totalAmount : txamt,
        totalProduct : count,
        userId : userId,
        userName : userName
        

       };
    
    if(isauth){
        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }
        
            else
            {
                cdata.add=user.add;
                Order.addOrder(cdata, function(err, order){
                    if(err){
                        
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                   
                    res.json({success: true,msg:'Request Sent Successfully',order:order});
                   
                });
            }
        });

        Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var cOrderId=cdata.orderId;
                var tAmt = cdata.totalAmount;
                var vendorDevice = vendor.deviceId;
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"New Order Recieved",
                    "body":"Order Id: "+cOrderId+" Amount: " +tAmt,
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":vendorDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });
         
      
    }
    else{
        res.json({success: false,msg:'Failed to add Request Token Authentication failed'});
    }
});

//Prime Service Booking
apiRoutes.post('/bookPrimeService', function(req, res){


    console.log("body"+req.body);
    
    
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
 
    var selectedItems= req.body.selectedItems;
    var isauth= route.memberinfo(token,userId);
   
    token= "JWT "+token;

    var randomstring2 = require("randomstring");
       var cdata = {
        orderId :randomstring2.generate(8),
        eventDate : selectedItems.dateofEvent,
        guests:selectedItems.noOfGuest,
        orderType:selectedItems.orderType,
        description:selectedItems.description,
        vendorName:"Admin",
        vendorId:"adminId",
        userId : userId,
        userName : userName,
        time:selectedItems.time
        

       };
    
    if(isauth){
        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }
        
            else
            {
                cdata.add=user.add;
                cdata.contactNum=user.contactNum
                Prime.addPrime(cdata, function(err, primeOrder){
                    if(err){
                        
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                   
                    res.json({success: true,msg:'Request Sent Successfully',primeOrder:primeOrder});
                   
                });
            }
        });

    }
    else{
        res.json({success: false,msg:'Failed to add Request Token Authentication failed'});
    }
});

//Prime Vendor Booking
apiRoutes.post('/bookPrimeVendor', function(req, res){


    console.log("body"+req.body);
    
    
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
 
    var selectedItems= req.body.selectedItems;
    var isauth= route.memberinfo(token,userId);
  var vendorId=selectedItems.vendorId;
   console.log("this is vendor id"+vendorId);
   console.log("this is vendor id"+selectedItems.vendorName);
    token= "JWT "+token;

    var randomstring2 = require("randomstring");
       var cdata = {
        orderId :randomstring2.generate(8),
        eventDate : selectedItems.dateofEvent,
        guests:selectedItems.noOfGuest,
        orderType:selectedItems.orderType,
        description:selectedItems.description,
        vendorName:selectedItems.vendorName,
        vendorId:selectedItems.vendorId,
        userId : userId,
        userName : userName
        

       };
    
    if(isauth){
        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }
        
            else
            {
                cdata.add=user.add;
                cdata.contactNum=user.contactNum
                Prime.addPrime(cdata, function(err, primeOrder){
                    if(err){
                        
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                   
                    res.json({success: true,msg:'Request Sent Successfully',primeOrder:primeOrder});
                   
                });
            }
        });
        Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var cOrderId=cdata.orderId;
                var tAmt = cdata.totalAmount;
                var vendorDevice = vendor.deviceId;
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"New Order Recieved",
                    "body":"Order Id: "+cOrderId+" Amount: " +tAmt,
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":vendorDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });

    }
    else{
        res.json({success: false,msg:'Failed to add Request Token Authentication failed'});
    }
});

//review vendor

apiRoutes.post('/review', function(req, res){


    console.log("body"+req.body);
    var vendorId=req.body.vendId;
    
    var token = req.body.token;

    var userId=req.body.userId;
   
    var rate = req.body.rate;
    
    console.log(rate+"this is ratee");
    var isauth= route.memberinfo(token,userId);
    

       if(isauth){
        console.log("okkk");
        Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
        if(err){
            console.log(err);
        res.json({success: false,msg:'Review Failed To Update'});
        throw err;
    }
           console.log("new rate"+rate);
                var prevRate = vendor.rate;
                if(typeof prevRate !== "undefined"){
                    console.log("prevRate rate"+prevRate);
                console.log(vendor+"hey thisis vendor");
                var updatedRate = (prevRate+rate)/2;
                console.log(prevRate+"prev rate");
                console.log(updatedRate+"new rate");
                var n = updatedRate.toFixed(2);
                }else{
                    var prevRate=0;
                }
                
           Vendor.update({'_id': vendorId}, { $set:{

               'rate':n,
               
             
           
               
               
               
           }}, function(err, numberAffected, rawResponse) {
              //handle it
                       if(err){
                           console.log(err);
                       res.json({success: false,msg:'Review Failed To Update'});
                       throw err;
                   }
                       else{
                           
                           res.json({success: true,msg:'Review Updated Successfully'});
                       }
                    });
           


                });
          
          
       }
       else{
           res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
       }

});

//review order

apiRoutes.post('/reviewOrder', function(req, res){


    console.log("body"+req.body);
    var orderId=req.body.orderId;
    
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
    if(req.body.feedback===undefined||req.body.feedback===null){
        var feedback ="No Feedback Given"
    }else{
        var feedback= req.body.feedback;
    }
    
    var rate = req.body.rate;
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;
    

       if(isauth){

           Order.update({ '_id':orderId}, { $set:{
               "rate":rate,
               "feedback":feedback,
               "isReviewed":true,
               "isRate":true,
               "isFeedback":true

               
           }}, function(err, numberAffected, rawResponse) {
              //handle it
                       if(err){
                           console.log(err);
                       res.json({success: false,msg:'Review Failed To Update'});
                       throw err;
                   }
                       else{
                            
                           res.json({success: true,msg:'Review Updated Successfully'});
                       }
                    });
           


                // }
          
          
       }
       else{
           res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
       }

});

//review order

apiRoutes.post('/setOrder', function(req, res){


    console.log("body"+req.body);
    var orderId=req.body.orderId;
    
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
    var feedback= req.body.feedback;
    var rate = req.body.rate;
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;
    

       if(isauth){

           Order.update({ '_id':orderId}, { $set:{
               
               "isReviewed":true,
               

               
           }}, function(err, numberAffected, rawResponse) {
              //handle it
                       if(err){
                           console.log(err);
                       res.json({success: false,msg:'Review Failed To Update'});
                       throw err;
                   }
                       else{
                            
                           res.json({success: true,msg:'Review Updated Successfully'});
                       }
                    });
           


                // }
          
          
       }
       else{
           res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
       }

});


//cancel order

apiRoutes.post('/cancelOrder', function(req, res){
	  

    var userId=req.body.userId;
    var vendorId=req.body.vendorId;
    // console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.body.tokenstr;
    console.log("HEY THIS IS TOKEN "+token);
    var orderId = req.body.orderId;
    console.log(orderId + " this is order id ");
    var status = req.body.status;
    var review = true;
    
    
    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Order.update({orderId: orderId}, { $set:{
            "status":status,
            "isReviewed":review,
            "isCancelled":true
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Order Failed To Update'});
                    throw err;
                }
                   
        });

        Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var orderId = req.body.orderId;
                
                var vendorDevice = vendor.deviceId;
                var tAmt=req.body.totalAmount;
              
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"Order CANCELLED",
                    "body":"Order Id: "+orderId+" Amount: " +tAmt,
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":vendorDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//cancel Appointment

// apiRoutes.post('/cancelAppointment', function(req, res){
	  

//     var userId=req.body.userId;
//     var vendorId=req.body.vendorId;
//     // console.log("HEY THIS IS VENDOR ID "+vendorId);
//     var token=req.body.tokenstr;
//     console.log("HEY THIS IS TOKEN "+token);
//     var orderId = req.body.orderId;
//     console.log(orderId + " this is order id ");
//     var status = req.body.status;
//     var review = true;
    
    
    
//     var isauth= route.memberinfo(token,userId);
    
//     if(isauth){
//         Prime.update({orderId: orderId}, { $set:{
//             "status":status,
//             "isReviewed":review,
//             "isCancelled":true
            
//         }}, function(err, numberAffected, rawResponse) {
//            //handle it
//                     if(err){
//                         console.log(err);
//                     res.json({success: false,msg:'Order Failed To Update'});
//                     throw err;
//                 }
//                     else{
                         
//                         res.json({success: true,msg:'Order Updated Successfully'});
//                     }
//         });

//         Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
//             if(err){
                
//                res.json("failed to fetch data");
                
//             }else{
//                 var orderId = req.body.orderId;
                
//                 var vendorDevice = vendor.deviceId;
               
              
//                 axios
//                 .post('https://fcm.googleapis.com/fcm/send', {
//                   "notification":{
//                     "title":"Order CANCELLED",
//                     "body":"Order Id: "+orderId+". ",
//                     "sound":"default",
//                     "click_action":"FCM_PLUGIN_ACTIVITY",
//                     "icon":"fcm_push_icon"
//                   },
//                   "data":{
//                     "landing_page":"tabs/tab2",
//                     "price":"$3,000.00"
//                   },
//                     "to":vendorDevice,
//                     "priority":"high",
//                     "restricted_package_name":""
//                 },
//                 {
//                   headers: {
//                    'Content-Type':'application/json',
//                     'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
//                   }
//               })
//                 .then(res => {
//                   console.log(`statusCode: ${res.statusCode}`)
//                   console.log(res)
//                 })
//                 .catch(error => {
//                   console.error(error)
//                 })
//             }
//         });

     
       
//     }
//     else{
//         res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
//     }

// });


//laundryorder

apiRoutes.post('/laundryOrder', function(req, res){


    console.log("body"+req.body);
    
  
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
    var time = req.body.time;
   
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;

    var randomstring2 = require("randomstring");
       var cdata = {
        orderId :randomstring2.generate(8),
        time :time,
        userId : userId,
        userName : userName

       };
    
    if(isauth){
        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }
        
            else
            {
                cdata.add=user.add;
                Laundry.addLaundry(cdata, function(err, laundry){
                    if(err){
                        
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                   
                    res.json({success: true,msg:'Request Sent Successfully',laundry:laundry});
                   
                });
            }
        });
    }
    else{
        res.json({success: false,msg:'Failed to add Request Token Authentication failed'});
    }
});


//Accept order
apiRoutes.post('/acceptOrder/:vendorId/:token', function(req, res){
	  

    var vendorId=req.params.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.params.token;
    console.log("HEY THIS IS TOKEN "+token);
    var orderId = req.body.orderId;
    console.log(orderId + " this is order id ");
    var status = req.body.status;
    var userId =req.body.userId;
    console.log(userId +" THIS IS USERID");
    
    
    var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
        Order.update({orderId: orderId}, { $set:{
            "status":status
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Order Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Order Updated Successfully'});
                    }
        });

        User.findOne({ '_id':userId }, function(err, user) {
            var userDevice = user.deviceId;
            console.log(userDevice);
            console.log(userId)
            
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var orderId = req.body.orderId;
                var tAmt = req.body.totalAmount;
                
              console.log(userDevice);
              console.log(tAmt);
              
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"Order Accepted",
                    "body":"Order Id: "+orderId+" Amount: " +tAmt,
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":userDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });
     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});


//Get Vendor device token

apiRoutes.post('/setVendorDeviceId/', function(req, res){
	  

    var vendorId=req.body.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.body.token;
    console.log("HEY THIS IS TOKEN "+token);
    
    var tokenDevice = req.body.tokenDevice;
    console.log(tokenDevice+"this is token device of vendor")
    
    var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
        Vendor.update({'_id': vendorId}, { $set:{
            "deviceId":tokenDevice
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Vendor Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Vendor Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//RejectOrder
apiRoutes.post('/rejectOrder/:vendorId/:token', function(req, res){
	  

    var vendorId=req.params.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.params.token;
    console.log("HEY THIS IS TOKEN "+token);
    var orderId = req.body.orderId;
    console.log(orderId + " this is order id ");
    var status = req.body.status;
    var userId =req.body.userId;
    
    
    
    var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
        Order.update({orderId: orderId}, { $set:{
            "status":status,
            "isCancelled":true
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Order Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Order Updated Successfully'});
                    }
        });

        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var orderId = req.body.orderId;
                
                var userDevice = user.deviceId;
                var tAmt=req.body.totalAmount;
              
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"Order Rejected",
                    "body":"Order Id: "+orderId+" Amount: " +tAmt,
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":userDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//AskReview

apiRoutes.post('/askReview/:vendorId/:token', function(req, res){
	  

    var vendorId=req.params.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.params.token;
    console.log("HEY THIS IS TOKEN "+token);
    var orderId = req.body.orderId;
    console.log(orderId + " this is order id ");
    var status = req.body.status;
    
    
    
    var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
        Order.update({orderId: orderId}, { $set:{
            "status":status,
            
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Order Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Order Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});


//Completed Order
apiRoutes.post('/completeOrder/:vendorId/:token', function(req, res){
	  

    var vendorId=req.params.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.params.token;
    console.log("HEY THIS IS TOKEN "+token);
    var orderId = req.body.orderId;
    console.log(orderId + " this is order id ");
    var status = req.body.status;
    var userId =req.body.userId;
    console.log(userId);
    
    var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
        Order.update({orderId: orderId}, { $set:{
            "status":status,
            
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Order Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Order Updated Successfully'});
                    }
        });
        
        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var orderId = req.body.orderId;
                console.log(userId+"THIS IS IUSER ID");
                var userDevice = user.deviceId;
                console.log(userDevice);
                var tAmt=req.body.totalAmount;
              
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"Order Delivered",
                    "body":"Order Id: "+orderId+" Amount: " +tAmt,
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":userDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });



     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Delivery Status
apiRoutes.post('/deliveryStatus/:vendorId/:token', function(req, res){
	  

    var vendorId=req.params.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.params.token;
    console.log("HEY THIS IS TOKEN "+token);
    var storeId = req.body.storeId;
    console.log(storeId + " this is store id ");
    var deliveryStatus = req.body.deliveryStatus;
    console.log(deliveryStatus+"deliverystatus");
        var delivery=deliveryStatus;
        var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
        Store.update({_id: storeId}, { $set:{
            'deliveryStatus':delivery
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Status Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Status Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
   
});

//store settings

apiRoutes.post('/storeSettings/:vendorId/:token', function(req, res){
     
    var vendorId=req.params.vendorId;
    console.log("HEY THIS IS VENDOR ID "+vendorId);
    var token=req.params.token;
    console.log("HEY THIS IS TOKEN "+token);
    var isauth= route.memberinfo(token,vendorId);
    
    var storeId = req.body.storeId;
    console.log(storeId + " this is store id ");
    var operationDays = req.body.obj;
    console.log(operationDays+"this is op days");
    var timings = req.body.timings;
    console.log(timings+"This is timing");
        
       
    
    if(isauth){
        Store.update({_id: storeId}, { $set:{
            'operationDays':operationDays,
            'Timings':timings
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Status Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Status Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
   
});



//get order

apiRoutes.get('/getOrders/:userId/:token' , function(req,res){

    var userId=req.params.userId;
    var token=req.params.token;
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;
    

    if(isauth){
        Order.find({userId:userId},function(err,orders)
        
        {
            res.json({success:true,orders:orders});
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});

//get Prime Products

apiRoutes.get('/getAppointment/:userId/:token' , function(req,res){

    var userId=req.params.userId;
    var token=req.params.token;
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;
    

    if(isauth){
        Prime.find(function(err,primeOrders)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }else{
                                                var odata=[];
                                                // var comp=[];
                                                // var newOrder=[];
                                                // var reviewOrder=[];
                                                       for(var k=0; k<primeOrders.length;k++){
                                                           if(primeOrders[k].userId===userId){
                                                               console.log(primeOrders[k].userId);
                                                               console.log(userId);
                                                               odata.push(primeOrders[k]);
                                                            //    if(orders[k].status==="Accepted"){
                                                            //        odata.push(orders[k]);
                                                            //    }else if(orders[k].status==="Completed"){
                                                            //        comp.push(orders[k]);
                                                            //    }else{
                                                            //        newOrder.push(orders[k]);
                                                            //    }
                                                           }else{
                                                               console.log("Dont add to list filter");
                                                           }
                                                        }
                                                        // for(var l=0;l<comp.length;l++){
                                                        //    if(comp[l].isReviewed===false){
                                                        //        reviewOrder.push(comp[l]);
                                                        //    }else{
                                                        //            console.log("NO ORDER FOR REVIEW! IT WORKS YEA")
                                                        //    }
                                                        // }
                                                          
                                                      

                                              }
            res.json({success:true,odata:odata});
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});


apiRoutes.get('/getUserDashboard/:userId', function(req, res){
	  
    var token = getToken(req.headers);
    var userId=req.params.userId;
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;
    

    if(isauth){
        
        
         User.findOne({ '_id':userId }, function(err, user) {
             
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
             if(!(isEmpty(user)))
                 {
             var accessLevelName =user.accessLevelName;
           
                     
                   
            if (user.isHod==true || accessLevelName=="hod")
            {
                       
                     
                     Product.find(function(err, products) {
                        
            
            if (err){
                console.log("error");
                res.send(err);
            }
                       
          
                            Category.find(function(err, category) {
                                if(err)
                                    {
                                            console.log("Error");
                                    }       
                         
                 res.json({success:true,product:products,category:category,user:user});
                        });
                    
                            });
                          
            }
            //for admin            
                          
             else if (user.accessLevelName=="superadmin"){
                 
                 User.find(function(err, user) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err);
            }
                    Product.find(function(err, products) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err);
            }
                      
                
            Order.find(function(err,orders)
            {

                         
                        
                              
                                        Category.find(function(err,categories)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }

                                              Prime.find(function(err,primeOrders)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }

                                              ActiveSubscription.find(function(err,activeSub)
                                              {
                                                 if (err){
                                                  
                                              console.log(err);

                                                
                                                }
                                                var activeSubscription=[]
                                                for(var i = 0; i <activeSub.length; i++){
                                                    var date = activeSub[i].startDate;
                                                    var a = moment(date).format('DD MMM YY, hh:mm a');
                                                    var dateEnd = activeSub[i].endDate;
                                                    var b = moment(dateEnd).format('DD MMM YY, hh:mm a');
                                                    console.log(a);
                                           activeSub[i].styleStartDate=a;
                                           activeSub[i].styleEndDate=b;
                                           activeSubscription.push(activeSub[i])
                                           console.log(b);
                                                  }
                                                  console.log("this is active sub"+activeSub);
                                              Store.find(function(err,storeD)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }
                                              

                                              Feed.find(function(err, feed) {

                                                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                                                if (err){
                                                    res.send(err);
                                                }

                                                Trend.find(function(err, trend) {

                                                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                                                    if (err){
                                                        res.send(err);
                                                    }
                                                    Subscription.find(function(err, subscriptions) {

                                                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                                                        if (err){
                                                            res.send(err);
                                                        }

                                              SubCategory.find(function(err,subcategories)
                          {
                             if (err){
                                console.log(err);
                             }

                             Vendor.find(function(err,vendors)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }


                                              vendorCategory.find(function(err,vendorcat)
                                              {
                                                 if (err){
                                                  
                                              console.log(err);
                                                
                                                }

                                            
                                               
                                                   
                                    res.json({success: true,users: user,products:products,orders:orders,categories:categories,vendors:vendors,vendorcat:vendorcat,subcategories:subcategories,stores:storeD,
                                        feed:feed,trends:trend,subscriptions:subscriptions,primeOrders:primeOrders,activeSub:activeSubscription});
                                            });
                                        });
                                        });
                                    });
                                    });
                                       
                                }); 
                            }); 
                
               
                                       
                                        
                                    });
                                });
                                });
                            });
                            });
                            
                                        
                                     
                        
                         
              // return all todos in JSON format
        
          
        });
         
             }
                    
                 }
             else
                 {
                     res.json({success: false,msg:'User does not exist'});
                 }
    });
         
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});

apiRoutes.get('/getUserDashboard/:userId/:token', function(req, res){
	
    var userId=req.params.userId;
    var token=req.params.token;
    var isauth= route.memberinfo(token,userId);
    token= "JWT "+token;
    

    if(isauth){
        
        
         User.findOne({ '_id':userId }, function(err, user) {
             
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
             if(!(isEmpty(user)))
                 {
             var accessLevelName =user.accessLevelName;
           
                     
                   
            if (user.isHod==true || accessLevelName=="basic")
            {
                       
                     Product.find(function(err, data) {
                        
            
            if (err){
                console.log("error");
                res.send(err);
            }else{
                var products=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].isActive===true){
                        products.push(data[i]);
                    }else{
                        //no comment
                    }
                }
            }

            SubCategory.find(function(err,subcategories)
                          {
                             if (err){
                                console.log(err);
                             }
                             Laundry.find(function(err,laundry)
                             {
                                if (err){
                                   console.log(err);
                                }
            
                            
                           
                         
                            Category.find(function(err, category) {
                                if(err)
                                    {
                                            console.log("Error");
                                    }
                                    var fdata=[];
                                    for(var j=0; j<category.length;j++){
                                        var prod = [];
                                        var cat = {};
                                        for(var k =0; k<products.length; k++){
                                            if(category[j].categoryName==products[k].categoryName){
                                                prod.push(products[k]);


                                            }
                                        }
                                        cat.category=category[j].categoryName;
                                        cat.products=prod;
                                        fdata.push(cat);
                                        
                                        
                
                                    }

                                    Order.find(function(err,orders)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }else{
                                                var odata=[];
                                                var comp=[];
                                                var newOrder=[];
                                                var reviewOrder=[];
                                                       for(var k=0; k<orders.length;k++){
                                                           if(orders[k].userId===userId){
                                                               console.log(orders[k].userId);
                                                               console.log(userId);
                                                               if(orders[k].status==="Accepted"){
                                                                   odata.push(orders[k]);
                                                               }else if(orders[k].status==="Completed" || orders[k].status==="CANCELLED" || orders[k].status==="Rejected"){
                                                                   comp.push(orders[k]);
                                                               }else{
                                                                   newOrder.push(orders[k]);
                                                               }
                                                           }else{
                                                               console.log("Dont add to list filter");
                                                           }
                                                        }
                                                        for(var l=0;l<comp.length;l++){
                                                           if(comp[l].isReviewed===false){
                                                               reviewOrder.push(comp[l]);
                                                           }else{
                                                                   console.log("NO ORDER FOR REVIEW! IT WORKS YEA")
                                                           }
                                                        }
                                                          
                                                      

                                              }
                                              
                             
                                  
                                  
                                    Vendor.find(function(err,vendors)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }

                                              vendorCategory.find(function(err,vendorcat)
                                              {
                                                 if (err){
                                                  
                                              console.log(err);
                                                
                                                }
                                                Store.find(function(err,storeD)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }
                                              
                                                  var stores=[];
                                             var today = moment().format('dddd');
                                             console.log(today+"this is today day");
                                             for(var i=0;i<storeD.length;i++){
                                                 if(today==="Monday" && storeD[i].operationDays.Monday===true){
                                                    
                                                        stores.push(storeD[i]);
                                                    
                                                 }else if(today==="Tuesday" && storeD[i].operationDays.Tuesday===true){
                                                    
                                                        console.log(today+"TODAYYYYYYYYY");
                                                        console.log(storeD[i].operationDays.Tuesday+"TODAYYYYYYYYY");
                                                        stores.push(storeD[i]);
                                                        console.log(stores+"TODAYYYYYYYYY");
                                                    
                                                 }
                                                 else if(today==="Wednesday" && storeD[i].operationDays.Wednesday===true){
                                                   
                                                        stores.push(storeD[i]);
                                                   
                                                 }else if(today==="Thursday" && storeD[i].operationDays.Thursday===true){
                                                    
                                                        stores.push(storeD[i]);
                                                    
                                                 }
                                                 else if(today==="Friday" && storeD[i].operationDays.Friday===true ){
                                                    
                                                 }
                                                 else if(today==="Saturday" && storeD[i].operationDays.Saturday===true){
                                                   
                                                        stores.push(storeD[i]);
                                                    
                                                 }else{
                                                    
                                                        stores.push(storeD[i]);
                                                    
                                                 }
                                                 
                                             }
                                              console.log(stores);
                                              Feed.find(function(err,feeds)
                                              {
                                                 if (err){
                                                  
                                              console.log(err);
                                                
                                                 }
                                              Trend.find(function(err,trend)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }else{

                                                  var topBanner =[];
                                                  var latestUpdate = [];
                                                  var primeService=[];
                                                  for(i=0;i<trend.length;i++){
                                                    if(trend[i].trendType==="Top Banner"){
                                                        topBanner.push(trend[i]);
                                                    }else if(trend[i].trendType==="Latest Update"){
                                                        latestUpdate.push(trend[i]);
                                                    }else if(trend[i].trendType==="Prime Service"){
                                                        primeService.push(trend[i]);
                                                    }else{

                                                    }
                                                  }
                                              }

                                    

                                        
                                            
                                                
              
                         
                 res.json({success:true,reviewOrder:reviewOrder,products:products,category:category,user:user,vendorcat:vendorcat,vendors:vendors,subcategories:subcategories,stores:stores,odata:odata,comp:comp,newOrder:newOrder,
                    laundryOrder:laundry,primeService:primeService,latestUpdate:latestUpdate,topBanner:topBanner,feeds:feeds});
                        });
                        
                    });
                });
            });
        });
    });
    });
});
});
});

                         
            }
            //for admin            
                        
             else if (user.isSuperAdmin==true){
                 
                 User.find(function(err, user) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err);
            }
                    Product.find(function(err, products) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err);
            }
                        
                              
                                        Category.find(function(err,categories)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }
                                              Order.find(function(err,orders)
                                              {
          
                                                   
                                    res.json({success: true,users: user,products:products,orders:orders,categories:categories});
                                            });
                                   
                                        
                                     }) ;   
                                    });
        });
            
             }
             
                 }
             else
                 {
                     res.json({success: false,msg:'users does not exist'});
                 }
    });
         
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});

//get vendor dashboard
apiRoutes.get('/getVendorDashboard/:vendorId/:token', function(req, res){
	if(res.success===true){
        var vendorId=req.params.vendorId;
        console.log("vendorID is HERE EEE"+vendorId);
    }
    var vendorId=req.params.vendorId;
        console.log("vendorID is HERE EEE"+vendorId);
    
    var token=req.params.token;
    var isauth= route.memberinfo(token,vendorId);
    token= "JWT "+token;
    

    if(isauth){
        
        
         Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
             if(!(isEmpty(vendor)))
                 {
             var accessLevelName =vendor.accessLevelName;
           
                     
                   
            if (accessLevelName=="vendor")
            {
                       
                     Product.find(function(err, products) {
                        
            
            if (err){
                console.log("error");
                res.send(err);
            }
            var produ=[];
            for(var f=0;f<products.length;f++){
                if(products[f].productVendorId===vendorId){
                    produ.push(products[f]);
                }
            }

            SubCategory.find(function(err,subcategories)
                          {
                             if (err){
                                console.log(err);
                             }
                             var subcat=[]
                             for(var v=0;v<subcategories.length;v++){
                                if(subcategories[v].subCategoryVendorId===vendorId){
                                    subcat.push(subcategories[v]);
                                }else{
                                    console.log("server Error");
                                }
                            }
            

                           
                         
                            Category.find(function(err, category) {
                                if(err)
                                    {
                                            console.log("Error");
                                    }
                                    var categ=[];
                                    for(var e=0;e<category.length;e++){
                                        if(category[e].categoryVendorId===vendorId){
                                            categ.push(category[e]);
                                        }
                                    }
                                    var fdata=[];
                                    for(var j=0; j<categ.length;j++){
                                        var prod = [];
                                        var cat = {};
                                        for(var k =0; k<produ.length; k++){
                                            if(categ[j].categoryName==produ[k].categoryName){
                                                prod.push(products[k]);


                                            }
                                        }
                                        cat.categ=category[j].categoryName;
                                        cat.produ=prod;
                                        fdata.push(cat);
                                        
                                        
                
                                    }
                                    

                                    
                             Store.find(function(err,storeD)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }
                                              var storeDet= []
                                              for(var u=0;u<storeD.length;u++){
                                                  if(storeD[u].storeVendorId===vendorId){
                                                    storeDet.push(storeD[u]);
                                                  }else{
                                                      console.log("server Error");
                                                  }
                                              }
                                            
                                              if(vendor.vendorCategoryName==="Home Cleaning"||vendor.vendorCategoryName==="Home Cleaning"
                                              || vendor.vendorCategoryName==="Auto-Service"||vendor.vendorCategoryName==="Laundry"){
                                                var pOrder=[];
                                                var odata=[];
                                                var comp=[];
                                                var newOrder=[];
                                               
                                                console.log("Goes inside check here")
                                               Prime.find(function(err,primeOrders)
                                               {
                                                  if (err){
                                                     console.log(err);
                                                  }
                                                  console.log("To find prime orders")
                                                  for(var x=0;x<primeOrders.length;x++){
                                                    
                   
                                                       if(primeOrders[x].vendorId===vendorId){
                                                        console.log("check for vendor id")
                                                           pOrder.push(primeOrders[x]);
                                                        }else{
                                                            console.log("No matching order");
                                                        }
                                                    console.log("this is order list"+pOrder);
                                                    
                                                }
                                                for(var k=0; k<pOrder.length;k++){
                                                    if(pOrder[k].status==="Accepted"){
                                                        odata.push(pOrder[k]);
                                                    }else if(pOrder[k].status==="Completed"){
                                                        comp.push(pOrder[k]);
                                                    
                                                    }else{
                                                        newOrder.push(pOrder[k]);
                                                    }
                                                }
                                               
                                                
              
                         
                 res.json({success:true,produ:produ,categ:categ,fdata:fdata,subcat:subcat,storeDet:storeDet,odata:odata,comp:comp,newOrder:newOrder,vendor:vendor});
                });

                                        
            }else{
                Order.find(function(err,orders)
                {
                   if (err){
                      console.log(err);
                   }
                   var filterOrder = [];
                   for(var x=0;x<orders.length;x++){
                       for(var y=0;y<orders[x].orderDesc.length;y++){

                          if(orders[x].orderDesc[y].productVendorId===vendorId){
                              filterOrder.push(orders[x]);
                           }else{
                               console.log("Server Error");
                           }
                       }
                       
                   }
                  
                   var odata=[];
                   var comp=[];
                   var newOrder=[];
                          for(var k=0; k<filterOrder.length;k++){
                              if(filterOrder[k].status==="Accepted"){
                                  odata.push(filterOrder[k]);
                              }else if(filterOrder[k].status==="Completed" || filterOrder[k].status==="CANCELLED" || filterOrder[k].status==="Rejected"){
                                  comp.push(filterOrder[k]);
                              
                              }else{
                                  newOrder.push(filterOrder[k]);
                              }
                          }

                          res.json({success:true,produ:produ,categ:categ,fdata:fdata,subcat:subcat,storeDet:storeDet,odata:odata,comp:comp,newOrder:newOrder,fOrder:filterOrder,vendor:vendor});
                        });
            }                  
                 
                    });
                   
                });
            });
        });
            
                       
                         
            }
            //for admin            
                        
             else if (user.isSuperAdmin==true){
                 
                 User.find(function(err, user) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err);
            }
                    Product.find(function(err, products) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err);
            }
                        
                              
                                        Category.find(function(err,categories)
                                            {
                                               if (err){
                                                
                                            console.log(err);
                                              
                                              }
                                              Order.find(function(err,orders)
                                              {
          
                                                   
                                    res.json({success: true,users: user,products:products,orders:orders,categories:categories});
                                            });
                                   
                                        
                                     }) ;   
                                    });
        });
            
             }
             
                 }
             else
                 {
                     res.json({success: false,msg:'Vendor does not exist'});
                 }
    });
         
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }
});
//end

//get graph order details
apiRoutes.post('/getOrderDetails/', function(req, res){
	  
    var token = req.body.token;
    var vendorId=req.body.vendorId;
    var isauth= route.memberinfo(token,vendorId);
    
    if(isauth){
         Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
         
    var dateStart = new Date();
   var ds=  moment(dateStart).format(); 
    console.log(ds +"this is start date");
    
    var dateEnd = dateStart.setDate(dateStart.getDate()-1);
    var de= moment(dateEnd).format();
    var dateEnd2 = dateStart.setDate(dateStart.getDate()-1);
    var de2= moment(dateEnd2).format();
    var dateEnd3 = dateStart.setDate(dateStart.getDate()-1);
    var de3= moment(dateEnd3).format();
    var dateEnd4 = dateStart.setDate(dateStart.getDate()-1);
    var de4= moment(dateEnd4).format();
    var dateEnd5 = dateStart.setDate(dateStart.getDate()-1);
    var de5= moment(dateEnd5).format();
    var dateEnd6 = dateStart.setDate(dateStart.getDate()-1);
    var de6= moment(dateEnd6).format();
    var dateEnd7 = dateStart.setDate(dateStart.getDate()-1);
    var de7= moment(dateEnd7).format();
    console.log(de +"this is End date");
    
    Order.find( //query today up to tonight
        
        {createdDate: {"$gte": de, "$lt": ds}}, function(err, orders){
            if(err){
                res.json("failed to fetch data");
            }

            
                
                var filterOrder = [];
                             for(var x=0;x<orders.length;x++){
                                 for(var y=0;y<orders[x].orderDesc.length;y++){

                                    if(orders[x].orderDesc[y].productVendorId===vendorId && orders[x].isCancelled===false && orders[x].status==="Completed"){

                                        filterOrder.push(orders[x]);
                                    }else{
                                        console.log("Server Error");
                                    }
                                }
                                
                            }
                                        var newAmt=0;
                                        for(var z=0;z<filterOrder.length;z++){
                                            var length=filterOrder.length;
                                            var toNum=Number(filterOrder[z].totalAmount);
                                            console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                          var cd = filterOrder[z].createdDate;
                                          newAmt += toNum;
                                        }
                                        var Day1=[{"amt":newAmt,"createdDate":cd,"todayOrders":length}];
                                        console.log(newAmt+cd+"WORKS");

                                        Order.find( //query today up to tonight
        
                                            {createdDate: {"$gte": de2, "$lt": de}}, function(err, orders){
                                                if(err){
                                                    res.json("failed to fetch data");
                                                }
                                                    
                                                    var filterOrder = [];
                                                                 for(var x=0;x<orders.length;x++){
                                                                     for(var y=0;y<orders[x].orderDesc.length;y++){
                                    
                                                                        if(orders[x].orderDesc[y].productVendorId===vendorId){
                                    
                                                                            filterOrder.push(orders[x]);
                                                                        }else{
                                                                            console.log("Server Error");
                                                                        }
                                                                    }
                                                                    
                                                                }
                                                                            var newAmt=0;
                                                                            for(var z=0;z<filterOrder.length;z++){
                                                                                
                                                                                var toNum=Number(filterOrder[z].totalAmount);
                                                                                console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                                                              var cd = filterOrder[z].createdDate;
                                                                              newAmt += toNum;
                                                                            }
                                                                            var Day2=[{"amt":newAmt,"createdDate":cd}];
                                                                            console.log(newAmt+cd+"WORKS");

                                                                            Order.find( //query today up to tonight
        
                                                                                {createdDate: {"$gte": de3, "$lt": de2}}, function(err, orders){
                                                                                    if(err){
                                                                                        res.json("failed to fetch data");
                                                                                    }
                                                                                        
                                                                                        var filterOrder = [];
                                                                                                     for(var x=0;x<orders.length;x++){
                                                                                                         for(var y=0;y<orders[x].orderDesc.length;y++){
                                                                        
                                                                                                            if(orders[x].orderDesc[y].productVendorId===vendorId){
                                                                        
                                                                                                                filterOrder.push(orders[x]);
                                                                                                            }else{
                                                                                                                console.log("Server Error");
                                                                                                            }
                                                                                                        }
                                                                                                        
                                                                                                    }
                                                                                                                var newAmt=0;
                                                                                                                for(var z=0;z<filterOrder.length;z++){
                                                                                                                    
                                                                                                                    var toNum=Number(filterOrder[z].totalAmount);
                                                                                                                    console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                                                                                                  var cd = filterOrder[z].createdDate;
                                                                                                                  newAmt += toNum;
                                                                                                                }
                                                                                                                var Day3=[{"amt":newAmt,"createdDate":cd}];
                                                                                                                console.log(newAmt+cd+"WORKS");

                                                                                                                Order.find( //query today up to tonight
        
                                                                                                                    {createdDate: {"$gte": de4, "$lt": de3}}, function(err, orders){
                                                                                                                        if(err){
                                                                                                                            res.json("failed to fetch data");
                                                                                                                        }
                                                                                                                            
                                                                                                                            var filterOrder = [];
                                                                                                                                         for(var x=0;x<orders.length;x++){
                                                                                                                                             for(var y=0;y<orders[x].orderDesc.length;y++){
                                                                                                            
                                                                                                                                                if(orders[x].orderDesc[y].productVendorId===vendorId){
                                                                                                            
                                                                                                                                                    filterOrder.push(orders[x]);
                                                                                                                                                }else{
                                                                                                                                                    console.log("Server Error");
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                            
                                                                                                                                        }
                                                                                                                                                    var newAmt=0;
                                                                                                                                                    for(var z=0;z<filterOrder.length;z++){
                                                                                                                                                        
                                                                                                                                                        var toNum=Number(filterOrder[z].totalAmount);
                                                                                                                                                        console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                                                                                                                                      var cd = filterOrder[z].createdDate;
                                                                                                                                                      newAmt += toNum;
                                                                                                                                                    }
                                                                                                                                                    var Day4=[{"amt":newAmt,"createdDate":cd}];
                                                                                                                                                    console.log(newAmt+cd+"WORKS");
                                                                                                                                                    
                                                                                                                                                    Order.find( //query today up to tonight
        
                                                                                                                                                        {createdDate: {"$gte": de5, "$lt": de4}}, function(err, orders){
                                                                                                                                                            if(err){
                                                                                                                                                                res.json("failed to fetch data");
                                                                                                                                                            }
                                                                                                                                                                
                                                                                                                                                                var filterOrder = [];
                                                                                                                                                                             for(var x=0;x<orders.length;x++){
                                                                                                                                                                                 for(var y=0;y<orders[x].orderDesc.length;y++){
                                                                                                                                                
                                                                                                                                                                                    if(orders[x].orderDesc[y].productVendorId===vendorId){
                                                                                                                                                
                                                                                                                                                                                        filterOrder.push(orders[x]);
                                                                                                                                                                                    }else{
                                                                                                                                                                                        console.log("Server Error");
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                                
                                                                                                                                                                            }
                                                                                                                                                                                        var newAmt=0;
                                                                                                                                                                                        for(var z=0;z<filterOrder.length;z++){
                                                                                                                                                                                            
                                                                                                                                                                                            var toNum=Number(filterOrder[z].totalAmount);
                                                                                                                                                                                            console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                                                                                                                                                                          var cd = filterOrder[z].createdDate;
                                                                                                                                                                                          newAmt += toNum;
                                                                                                                                                                                        }
                                                                                                                                                                                        var Day5=[{"amt":newAmt,"createdDate":cd}];
                                                                                                                                                                                        console.log(newAmt+cd+"WORKS");

                                                                                                                                                                                        Order.find( //query today up to tonight
        
                                                                                                                                                                                            {createdDate: {"$gte": de6, "$lt": de5}}, function(err, orders){
                                                                                                                                                                                                if(err){
                                                                                                                                                                                                    res.json("failed to fetch data");
                                                                                                                                                                                                }
                                                                                                                                                                                                    
                                                                                                                                                                                                    var filterOrder = [];
                                                                                                                                                                                                                 for(var x=0;x<orders.length;x++){
                                                                                                                                                                                                                     for(var y=0;y<orders[x].orderDesc.length;y++){
                                                                                                                                                                                    
                                                                                                                                                                                                                        if(orders[x].orderDesc[y].productVendorId===vendorId){
                                                                                                                                                                                    
                                                                                                                                                                                                                            filterOrder.push(orders[x]);
                                                                                                                                                                                                                        }else{
                                                                                                                                                                                                                            console.log("Server Error");
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    
                                                                                                                                                                                                                }
                                                                                                                                                                                                                            var newAmt=0;
                                                                                                                                                                                                                            for(var z=0;z<filterOrder.length;z++){
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                var toNum=Number(filterOrder[z].totalAmount);
                                                                                                                                                                                                                                console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                                                                                                                                                                                                              var cd = filterOrder[z].createdDate;
                                                                                                                                                                                                                              newAmt += toNum;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            var Day6=[{"amt":newAmt,"createdDate":cd}];
                                                                                                                                                                                                                            console.log(newAmt+cd+"WORKS");

                                                                                                                                                                                                                            Order.find( //query today up to tonight
        
                                                                                                                                                                                                                                {createdDate: {"$gte": de7, "$lt": de6}}, function(err, orders){
                                                                                                                                                                                                                                    if(err){
                                                                                                                                                                                                                                        res.json("failed to fetch data");
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                        var filterOrder = [];
                                                                                                                                                                                                                                                     for(var x=0;x<orders.length;x++){
                                                                                                                                                                                                                                                         for(var y=0;y<orders[x].orderDesc.length;y++){
                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                            if(orders[x].orderDesc[y].productVendorId===vendorId){
                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                filterOrder.push(orders[x]);
                                                                                                                                                                                                                                                            }else{
                                                                                                                                                                                                                                                                console.log("Server Error");
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                var newAmt=0;
                                                                                                                                                                                                                                                                for(var z=0;z<filterOrder.length;z++){
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                    var toNum=Number(filterOrder[z].totalAmount);
                                                                                                                                                                                                                                                                    console.log(typeof(toNum) +"HEYHEYEHEYHEY");
                                                                                                                                                                                                                                                                  var cd = filterOrder[z].createdDate;
                                                                                                                                                                                                                                                                  newAmt += toNum;
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                var Day7=[{"amt":newAmt,"createdDate":cd}];
                                                                                                                                                                                                                                                                console.log(newAmt+cd+"WORKS");
                                     
            
            res.json({success:true,msg:'Order details fetch successfully',filterOrder:filterOrder,vendor:vendor,Day1:Day1,Day2:Day2,Day3:Day3,Day4:Day4,Day5:Day5,Day6:Day6,Day7:Day7})
        });
    });
    });
});
});
});
});
});
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//end


apiRoutes.get('/getUserDetails/:userId', function(req, res){
	  
    var token = getToken(req.headers);
    var userId=req.params.userId;
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
         User.findOne({ '_id':userId }, function(err, user) {
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
            // City.find()
             
       
             res.json({success:true,msg:'User details fetch successfully',user:user});
             
    });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//get subscriptionDetails

apiRoutes.get('/getSubscriptionDetails/:userId/:tokenstr', function(req, res){
	  
  
   
    var userId=req.params.userId;
    var token=req.params.tokenstr;
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        ActiveSubscription.find({'userId':userId}, function(error, activesubscription) {
            console.log(activesubscription+"THIS IS user active subscription");
            Subscription.find({}, function(err, subscriptions) {
               
                if(err || error){
                 
                    res.json("failed to fetch data");
                     
                 }
                 else{
                     
              
                 res.json({success:true,msg:'Subscription List fetched successfully',subscriptions:subscriptions});
                }

    });
});
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//get products

apiRoutes.post('/getProducts', function(req, res){
	  
  
   
    var userId=req.body.userId;
    var token = req.body.token;
    var isauth= route.memberinfo(token,userId); 
    var vendorId=req.body.vendorId;
    var productName = req.body.productName;
    
    if(isauth){

      
        Product.findOne({'productVendorId':vendorId,'productName':productName}, function(error, products) {
            console.log(products+"THIS IS user active subscription");
           
               
                if(error){
                 
                    res.json("failed to fetch data");
                     
                 }
                 else{
                     
              
                 res.json({success:true,msg:'Subscription List fetched successfully',products:products});
                }

});
         
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//get all product

apiRoutes.post('/getAllProducts', function(req, res){
	  
  
   
    var userId=req.body.userId;
    var token=req.body.token;
    var vendorId=req.body.vendorId;
    var isauth= route.memberinfo(token,userId);
    console.log(userId);
    console.log(token);
    console.log(vendorId);
    if(isauth){

       
        
        Product.find({ 'productVendorId': vendorId}, function(err, data) {
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }else{
                var products=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].isActive===true){
                        products.push(data[i]);
                    }else{
                        //no comment
                    }
                }
             }
          
             res.json({success:true,msg:'User details fetch successfully',products:products});
             
    });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//get products by category

apiRoutes.post('/getProductsByCategory', function(req, res){
	  
  
   
    var userId=req.body.userId;
    var token=req.body.token;
    var vendorId=req.body.vendorId;
    var subCategoryId=req.body.subCategoryId;
    console.log(typeof(subCategoryId)+"TYPE OF PRODUCT SUB CAT")
    var isauth= route.memberinfo(token,userId);
    console.log(userId +"this is user id");
    console.log(subCategoryId+"this is sub category ID");
    console.log(vendorId+"this is vendor id");
    if(isauth){

       
        
        Product.find({ 'productVendorId': vendorId,'productSubCategoryId':subCategoryId}, function(err, data) {
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }else{
                var products=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].isActive===true){
                        products.push(data[i]);
                    }else{
                        //no comment
                    }
                }
             }
             
               
             res.json({success:true,msg:'User details fetch successfully',products:products});
             
    });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//get products by category
//get all product

apiRoutes.post('/getVendorProducts', function(req, res){
	  
  
   
    var vendorId=req.body.vendorId;
    var token=req.body.token;
    var subCategoryName= req.body.subCategoryName;
    var isauth= route.memberinfo(token,vendorId);
    console.log(vendorId+"HEY");
    console.log(token+"THIS IS TOKENNNNNNN");
    
    if(isauth){

       
        
        Product.find({ 'productVendorId': vendorId,'productSubCategory':subCategoryName}, function(err, products) {
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
             
               
             res.json({success:true,msg:'User details fetch successfully',products:products});
             
    });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});




//active subscription

apiRoutes.get('/getActiveSubscription/:userId/:tokenstr', function(req, res){
	  
  
   
    var userId=req.params.userId;
    var token=req.params.tokenstr;
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){

       
        
        ActiveSubscription.find({ 'userId': userId}, function(err, activeSubscription) {
             
             if(err){
                 
                res.json("failed to fetch data");
                 
             }
             var newSub=[];
             var today=moment();
             for(var i=0;i<activeSubscription.length;i++){
                 if(activeSubscription[i].endDate>today){
                    activeSubscription.isActive=false;
                    newSub.push(activeSubscription[i].orderDesc[0]);
                 }else{
                    newSub.push(activeSubscription[i].orderDesc[0]);
                 }
                
                }
              
               
             res.json({success:true,msg:'User details fetch successfully',subscriptions:activeSubscription,newSub:newSub});
             
    });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Pause subscription

apiRoutes.post('/pauseSubscription', function(req, res){
	  
  
   
    var userId=req.body.userId;
    var token = req.body.token;
    
    var isauth= route.memberinfo(token,userId);
    var subscriptionId=req.body.subscriptionId;
    var vendorId=req.body.vendorId;
    var isPause=req.body.isPause;
    var tDate = Date.now();
    var todayDate = moment(tDate).toISOString();
    var showtDate = moment(todayDate).format("DD-MM-YYYY");
    
    if(isauth){

      
        ActiveSubscription.update({'subscriptionId': subscriptionId}, { $set: {'pauseDate':todayDate,'isPause':isPause}}, function (err, activeSubscription) {
            //handle it
                     if(err){
                     res.json({success: false,msg:'Subscription Failed to Pause'});
                     //throw err;
                     console.log(err);
                 }
                     else{
                         res.json({success: true,msg:'Subscription Pause Successfully'});
                     }
             });

             Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
                if(err){
                    
                   res.json("failed to fetch data");
                    
                }else{
                   
                    
                    var vendorDevice = vendor.deviceId;
                    axios
                    .post('https://fcm.googleapis.com/fcm/send', {
                      "notification":{
                        "title":"Subscription Pause Alert!",
                        "body":"The active Subscription Id: "+subscriptionId+" has been paused Date: " +showtDate,
                        "sound":"default",
                        "click_action":"FCM_PLUGIN_ACTIVITY",
                        "icon":"fcm_push_icon"
                      },
                      "data":{
                        "landing_page":"tabs/tab2",
                        "price":"$3,000.00"
                      },
                        "to":vendorDevice,
                        "priority":"high",
                        "restricted_package_name":""
                    },
                    {
                      headers: {
                       'Content-Type':'application/json',
                        'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                      }
                  })
                    .then(res => {
                      console.log(`statusCode: ${res.statusCode}`)
                      console.log(res)
                    })
                    .catch(error => {
                      console.error(error)
                    })
                }
            });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Resume Subscription

apiRoutes.post('/resumeSubscription/', function(req, res){
	  
  
   
    var userId=req.body.userId;
    var token=req.body.token;
    var isauth= route.memberinfo(token,userId);
    var subscriptionId=req.body.subscriptionId;
    var vendorId=req.body.vendorId;
    var tDate = Date.now();
    var todayDate = moment(tDate);
    var toDate = moment(todayDate).format("DD-MM-YYYY"); 
    
    console.log(toDate+"HEYYY Yes");
    if(isauth){
        console.log(subscriptionId);
        ActiveSubscription.findOne({ 'subscriptionId': subscriptionId}, function(err, subscriptionOrder) {
             
            if(err){
                
               res.json("failed to fetch data");
                
            }
           console.log(subscriptionOrder+"HEYYYYYYYYYYYY");
            var pdate = new Date(subscriptionOrder.pauseDate);
            console.log(typeof(subscriptionOrder.pauseDate))
            var pauseDate = moment(pdate);
            console.log(pdate+"HEY YEA");
            var paDate = moment(pauseDate).format("DD-MM-YYYY"); 
            console.log(paDate+"THIS IS pauseDate DATE");
            var eDate = new Date(subscriptionOrder.endDate);
            console.log(eDate+"this is edate");
            var endDate = moment(eDate);
            var ene = moment(endDate).format("DD-MM-YYYY");
            console.log(endDate+"THIS IS ENDdddddddddddddd DATE");
            console.log(ene+"THIS IS END DATE");
            var days = todayDate.diff(pauseDate, 'days');
             
            console.log(days+"THIS IS DAYS DATE");
            var updatedEndDate = moment(endDate).add(days, 'days').toISOString();
            var showEDate = moment(updatedEndDate).format("DD-MM-YYYY");
            console.log(showEDate+"THIS IS UPDATED DATE");

            
        ActiveSubscription.update({'subscriptionId': subscriptionId}, { $set: {'endDate':updatedEndDate,'isPause':true}}, 
        function (err, subscriptionOrder) {
            //handle it
                     if(err){
                     res.json({success: false,msg:'Subscription Failed to Update '});
                     //throw err;
                     console.log(err);
                 }
                     else{
                         res.json({success: true,msg:'Subscription Resumed Successfully Updated'});
                     }
             });
           

            Vendor.findOne({ '_id':vendorId }, function(err, vendor) {
             
             
                if(err){
                    
                   res.json("failed to fetch data");
                    
                }else{
                  
                    // var tAmt = cdata.totalAmount;
                    var vendorDevice = vendor.deviceId;
                    axios
                    .post('https://fcm.googleapis.com/fcm/send', {
                      "notification":{
                        "title":"Subscription Reactivated",
                        "body":"The subscription of Subscription Id: "+subscriptionId+" is now Resumed. This Subscription will expire on" +showEDate,
                        "sound":"default",
                        "click_action":"FCM_PLUGIN_ACTIVITY",
                        "icon":"fcm_push_icon"
                      },
                      "data":{
                        "landing_page":"tabs/tab2",
                        "price":"$3,000.00"
                      },
                        "to":vendorDevice,
                        "priority":"high",
                        "restricted_package_name":""
                    },
                    {
                      headers: {
                       'Content-Type':'application/json',
                        'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                      }
                  })
                    .then(res => {
                      console.log(`statusCode: ${res.statusCode}`)
                      console.log(res)
                    })
                    .catch(error => {
                      console.error(error)
                    })
                }
            });
        });
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});



// upade userDetails
apiRoutes.post('/updateUserDetails/:userId', function(req, res){
	  
   
    var userId=req.params.userId;
    console.log(userId);
    var isAddress=req.body.isAddress;
    var iscno = req.body.cno;
    var token = req.body.Authorization;
    console.log(token);
   // token= "JWT "+token;
    var isauth= route.memberinfo(token,userId);
    if(isauth){
        User.findOne({ '_id': userId }, function(err, user) {
         
            if(!user){
                res.json({success: false, msg: 'No user with this Contact Number exist'});
            }
            
            else{
                console.log("isAddress"+isAddress);
        if(isAddress === false)
            {
               
             
        
            
                    var address = req.body.add;
             console.log(address);
                   
         
             
                    User.update({'_id': userId}, { $set: {add:address}}, function (err, user) {
                        //handle it
                                 if(err){
                                 res.json({success: false,msg:'Failed to Update Address'});
                                 //throw err;
                                 console.log(err);
                             }
                                 else{
                                     res.json({success: true,msg:'Address Successfully Updated'});
                                 }
                         });
                
                
           
            }
                      
             else 
             
             {
                 console.log("in else");
                 
                    var contactNumber= req.body.contactNumber;
                
                 
                      User.update({'_id': userId}, { $set: {contactNum:contactNumber}}, function (err, user) {
                       //handle it
                                if(err){
                                res.json({success: false,msg:'Failed to Update'});
                                //throw err;
                                console.log(err);
                            }
                                else{
                                    res.json({success: true,msg:'User Successfully Updated'});
                                }
                        });
                 
                 
             }
            
            }
        });
   
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

apiRoutes.post('/updateUserDetails/:userId', function(req, res){
	  
    var token = getToken(req.headers);
    var userIdupdate=req.body.userId;
       var userId=req.params.userId;
    var isauth= route.memberinfo(token,userId);
    var user =req.body;
    var isPasswordChange=req.body.pwdmode;
    
    if(isauth){

        if(isPasswordChange)
            {
                User.findOne({ '_id': userIdupdate }, function(err, user) {
         
         if(!user){
             res.json({success: false, msg: 'No user with this email id exist'});
         }
         
         else{
             
        
            
                    var pass = req.body.pwd;
             
                    user.password=pass;
         
             
                    user.save(function(err,user){
                 
             
                    User.update({ _id:user._id }, { $set: { password:user.password}}, function (err, user)
                                {
                        if (err) throw err;
                       else{
                                    res.json({success: true,msg:'Password Successfully Updated'});
                                }
                                });
                        

        }); 
                
                
            }
         });
            }
                      
             else
             
             {
                 
                      User.update({'_id': userIdupdate}, user, function(err, numberAffected, rawResponse) {
                       //handle it
                                if(err){
                                res.json({success: false,msg:'Failed to Update'});
                                //throw err;
                                console.log(err);
                            }
                                else{
                                    res.json({success: true,msg:'User Successfully Updated'});
                                }
                        });
                 
                 
             }
 
        
      
     
    
        
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});


//update vendorDetails

apiRoutes.post('/updateVendorDetails/:vendorId', function(req, res){
	  
   
    var vendorId=req.params.vendorId;
    console.log(vendorId);
    var isAddress=req.body.isAddress;
    var token = req.body.Authorization;
    console.log(token);
   // token= "JWT "+token;
    var isauth= route.memberinfo(token,vendorId);
    if(isauth){
        Vendor.findOne({ '_id': vendorId }, function(err, vendor) {
         
            if(!vendor){
                res.json({success: false, msg: 'No vendor with this Contact Number exist'});
            }
            
            else{
                console.log("isAddress"+isAddress);
        if(isAddress === false)
            {
               console.log('this is vendor Id'+vendorId);
               
                    var address = req.body.add;
             console.log('this is address'+address);
                   
         
             
                    Vendor.update({'_id': vendorId}, { $set: {'vendorAddress':address}}, function (err, vendor) {
                        //handle it
                                 if(err){
                                 res.json({success: false,msg:'Failed to Update Address'});
                                 //throw err;
                                 console.log(err);
                             }
                                 else{
                                     res.json({success: true,msg:'Address Successfully Updated'});
                                 }
                         });
                
                
           
            }
                    
            }
        });
   
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});


//update KYC

apiRoutes.post('/updateVendorKYC/:vendorId', function(req, res){
	  
   
    var vendorId=req.params.vendorId;
    console.log(vendorId);
   
    var token = req.body.Authorization;
    console.log(token);
    var KYCNumber = req.body.kyc;
   // token= "JWT "+token;
    var isauth= route.memberinfo(token,vendorId);
    if(isauth){
        Vendor.findOne({ '_id': vendorId }, function(err, vendor) {
         
            if(!vendor){
                res.json({success: false, msg: 'No vendor with this ID exist'});
            }
            
            else{
                console.log("KYC"+KYCNumber);
      
               
             
        
            
                    
             console.log(vendorId);
                   
         
             
                    Vendor.update({'_id': vendorId}, { $set: {'kyc':KYCNumber}}, function (err, vendor) {
                        //handle it
                                 if(err){
                                 res.json({success: false,msg:'Failed to Update KYC'});
                                 //throw err;
                                 console.log(err);
                             }
                                 else{
                                     res.json({success: true,msg:'KYC Successfully Updated'});
                                 }
                         });
                
                
           
           
                    
            }
        });
   
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});



apiRoutes.post('/setDeviceId/', function(req, res){
	  
        
           var userId=req.body.userId;
           var token = req.body.token;
        var isauth= route.memberinfo(token,userId);
        var deviceId =req.body.tokenDevice;
    console.log(deviceId);
        
        if(isauth){
    
         
             
            
                User.update({'_id': userId}, { $set:{
                    "deviceId":deviceId
                    
                }}, function(err, numberAffected, rawResponse) {
                   //handle it
                            if(err){
                                console.log(err);
                            res.json({success: false,msg:'Status Failed To Update'});
                            throw err;
                        }
                            else{
                                 
                                res.json({success: true,msg:'Status Updated Successfully'});
                            }
                });
           
                
        }
        else{
            res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
        }
    
    });




apiRoutes.post('/updateProduct', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    
    var productId = req.body.productId;
    var productName = req.body.productName;
    var productCost = parseInt(req.body.productCost);
    var productSell = parseInt(req.body.productSell);
    var productQuantity = req.body.productQuantity;
    var productCategoryId = req.body.productCategoryId;
    var productCategoryName = req.body.productCategoryName;

    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Product.update({_id: productId}, { $set:{
            "productName":productName,
            "productCost":productCost,
            "productsell":productSell,
            "productQuantity":productQuantity,
            "categoryName":productCategoryName,
            "categoryId":productCategoryId,
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Product Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Product Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Add Latest News And Updates

apiRoutes.post( '/addNews', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var news = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var newsData = {

        newsTitle:news.newsTitle, 
        newsDescription:news.newsDescription,  
        newsType:news.newsType,       
        newsVendorId:news.newsVendorId,
        newsVendorName:news.newsVendorName,
        newsUrl:baseUrl+req.file.filename,
      

    }


    console.log("tester"+JSON.stringify(req.body));

 

 
  

 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Feed.addFeed(newsData,function(err, newsData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'News and Updates Added Successfully',data:newsData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});

//update Feed
apiRoutes.post('/updateNews', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    
    var feedId = req.body.feedId;
    var newsDescription = req.body.newsDescription;
    var newsTitle = req.body.newsTitle;
    
    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Feed.update({_id: feedId}, { $set:{
            "newsDescription":newsDescription,
            "newsTitle":newsTitle,
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'FEED Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'FEED Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Update Store

apiRoutes.post('/updateStore', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    
    var storeId = req.body.storeId;
    var storeName = req.body.storeName;
    var storeContactNumber = req.body.storeContactNumber;
    var storeAddress = req.body.storeAddress;

    
    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Store.update({_id: storeId}, { $set:{
            "storeName":storeName,
            "storeContactNumber":storeContactNumber,
            "storeAddress":storeAddress,
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Store Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Store Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Delete Feed

//delete expensehead using expensehead  id
apiRoutes.post('/deleteFeed', function(req, res){
	var feedId = req.body.feedId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        Feed.findByIdAndRemove({_id: feedId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Feed'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Feed Successfully Deactivated'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//delete Product

apiRoutes.post('/deleteProduct', function(req, res){
	var productId = req.body.productId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        Product.findByIdAndRemove({_id: productId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Product'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Product Removed Successfully'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//Delete Store


apiRoutes.post('/deleteStore', function(req, res){
	var storeId = req.body.storeId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        Store.findByIdAndRemove({_id: storeId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No Such Store'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Store Removed Successfully'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});



//Delete CAtegory

apiRoutes.post('/deleteCategory', function(req, res){
	var categoryId = req.body.categoryId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        Category.findByIdAndRemove({_id: categoryId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Feed'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Category Removed Successfully'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//delete Subcategory

apiRoutes.post('/deleteSubCategory', function(req, res){
	var subCategoryId = req.body.subCategoryId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        SubCategory.findByIdAndRemove({_id: subCategoryId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Feed'});
			throw err;
		}
            else{
                res.json({success: true,msg:'SubCategory Removed Successfully'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//delete vendorCategory


apiRoutes.post('/deleteVendorCategory', function(req, res){
	var vendorCategoryId = req.body.vendorCategoryId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        vendorCategory.findByIdAndRemove({_id: vendorCategoryId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Feed'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Vendor Category Removed Successfully'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//Add Type and trends

apiRoutes.post( '/addTrend', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var trends = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var trendData = {
        trendTitle:trends.trendTitle,
        trendType:trends.trendType,
        // trendDescription:trends.trendDescription, 
        trendVendorId:trends.trendVendorId,
        trendVendorName:trends.trendVendorName,       
        
        trendUrl:baseUrl+req.file.filename,
      

    }


    console.log("tester"+JSON.stringify(req.body));

 
 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Trend.addTrend(trendData,function(err, trendData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'News and Updates Added Successfully',data:trendData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});

//update Trend
apiRoutes.post('/updateTrend', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var trendTitle = req.body.trendTitle;
    var trendId = req.body.trendId;
    // var trendDescription = req.body.trendDescription;
   
    
    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Trend.update({_id: trendId}, { $set:{
            // "trendDescription":trendDescription,
            "trendTitle":trendTitle
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Trend Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Trend Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Delete Feed

//delete expensehead using expensehead  id
apiRoutes.post('/deleteTrend', function(req, res){
	var trendId = req.body.trendId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        Trend.findByIdAndRemove({_id: trendId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Trend'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Trend Successfully Deactivated'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//Subscription

apiRoutes.post( '/addSubscription', uploadMiddleware.single('attachment'), function( req, res, next ) {

 
    var token = getToken(req.headers);
    var userId=req.body.userId;
    var subscriptions = req.body;
    
    var isauth= route.memberinfo(token,userId);
   // token= "JWT "+token;
    console.log("This is body "+JSON.stringify(req.body));
    console.log("This is file name"+req.file.filename);
    var subscriptionData = {
        subscriptionVendorId:req.body.subscriptionVendorId,        
        subscriptionVendorName:req.body.subscriptionVendorName, 
        subscriptionName:subscriptions.subscriptionName,
        subscriptionDescription:subscriptions.subscriptionDescription,  
        subscriptionAmount:subscriptions.subscriptionAmount, 
        subscriptionOfferPrice:subscriptions.subscriptionOfferPrice,     
        
        subscriptionUrl:baseUrl+req.file.filename,
      

    }


    console.log("tester"+JSON.stringify(req.body));

 
 var isauth= route.memberinfo(token,userId);

 if(isauth){

    Subscription.addSubscription(subscriptionData,function(err, subscriptionData){
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to add Request'});
        //	throw err;
        }
        else{
            res.json({success:true,msg:'News and Updates Added Successfully',data:subscriptionData});
        }
    });
    
 }
 else{
     res.json({success: false,msg:'Failed to update Token Authentication failed'});
 }

});

//update Subscription
apiRoutes.post('/updateSubscription', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    
    var subscriptionId = req.body.subscriptionId;
    var subscriptionName = req.body.subscriptionName;
    var subscriptionDescription = req.body.subscriptionDescription;
    var subscriptionAmount = req.body.subscriptionAmount;
    var subscriptionOfferPrice = req.body.subscriptionOfferPrice;
   
    
    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Subscription.update({_id: subscriptionId}, { $set:{
            "subscriptionName":subscriptionName,
            "subscriptionDescription":subscriptionDescription,
            "subscriptionAmount":subscriptionAmount,
            "subscriptionOfferPrice":subscriptionOfferPrice,
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Subscription Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Subscription Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Delete Feed

//delete expensehead using expensehead  id
apiRoutes.post('/deleteSubscription', function(req, res){
	var subscriptionId = req.body.subscriptionId;
      var token = getToken(req.headers);
   // console.log("logging"+req.body.merchantId);
    var userId=req.body.userId;
   // console.log(vendor);
   // console.log(token);
    var isauth= route.memberinfo(token,userId);
   // console.log(isauth);
    if(isauth){
        Subscription.findByIdAndRemove({_id: subscriptionId}, {
    isActive: false
}, function(err, numberAffected, rawResponse) {
   //handle it
            if(err){
            res.json({success: false,msg:'No such Subscription'});
			throw err;
		}
            else{
                res.json({success: true,msg:'Subscription Successfully Deactivated'});
            }
});

    }
    
    else{
        res.json({success: false,msg:'Not Authorised'});
    }
});

//SubscriptionOrder

apiRoutes.post('/subscriptionOrder', function(req, res){


    console.log("body"+req.body);
    var txamt=req.body.txAmt;
    
    var token = req.body.token;
    var userId=req.body.userId;
    var userName=req.body.userName;
    var count = req.body.count;
    var selectedItems= req.body.selectedItems;
    var isauth= route.memberinfo(token,userId);
    var subscriptionVendorId = selectedItems[0].subscriptionVendorId;
    var sdate = Date.now();
    var startDate = moment(sdate);
   
    var endDate =  moment(startDate).add(1, 'months').calendar();
    var ea = moment(endDate);
    console.log(startDate+"enddddddddddddddddddddddd");
    console.log(ea+"HEY THIS IS END DATE SET IN DB");
    var showea = moment(ea).format("MMM Do YY");
    console.log(showea+"HEY");
    var randomstring2 = require("randomstring");
    var subId=randomstring2.generate(8);
    selectedItems[0].subId=subId;
    console.log(selectedItems.subId+"HEYYYY");
       var cdata = {
        subscriptionId :subId,

        orderDesc : selectedItems,
        
        
        totalAmount : txamt,
        startDate:startDate,
        endDate:ea,
        pauseDate:sdate,
        userId : userId,
        userName : userName
        

       };
       console.log(cdata.orderDesc.subId+"HEYYYYhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
       console.log(typeof(cdata.orderDesc.subId)+"HEYYYYhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    if(isauth){
        User.findOne({ '_id':userId }, function(err, user) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }
        
            else
            {
                cdata.add=user.add;
                ActiveSubscription.addsubscriptionOrder(cdata, function(err, suborder){
                    if(err){
                        
                        res.json({success: false, msg: 'Failed to add Request'});
                    //	throw err;
                    }
                   
                    res.json({success: true,msg:'Request Sent Successfully',subscriptionorder:suborder});
                   
                });
            }
        });

        Vendor.findOne({ '_id':subscriptionVendorId }, function(err, vendor) {
             
             
            if(err){
                
               res.json("failed to fetch data");
                
            }else{
                var subscriptionId=cdata.subscriptionId;
                var tAmt = cdata.totalAmount;
                var vendorDevice = vendor.deviceId;
                axios
                .post('https://fcm.googleapis.com/fcm/send', {
                  "notification":{
                    "title":"New Active Subscription",
                    "body":"Subscription Id: "+subscriptionId+" Amount: " +tAmt+".This subscription will expire on "+showea+".",
                    "sound":"default",
                    "click_action":"FCM_PLUGIN_ACTIVITY",
                    "icon":"fcm_push_icon"
                  },
                  "data":{
                    "landing_page":"tabs/tab2",
                    "price":"$3,000.00"
                  },
                    "to":vendorDevice,
                    "priority":"high",
                    "restricted_package_name":""
                },
                {
                  headers: {
                   'Content-Type':'application/json',
                    'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
                  }
              })
                .then(res => {
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(res)
                })
                .catch(error => {
                  console.error(error)
                })
            }
        });
         
      
    }
    else{
        res.json({success: false,msg:'Failed to add Request Token Authentication failed'});
    }
});

//Pause subscription

apiRoutes.post('/pauseProduct', function(req, res){
	  
  
   
    
    var token = req.body.token;
    var vendorId=req.body.vendorId;
    var isauth= route.memberinfo(token,vendorId);
    var productId=req.body.productId;
    
    var isActive=req.body.isActive;
  
    
    if(isauth){

      
        Product.update({'_id': productId}, { $set: {'isActive':isActive}}, function (err, product) {
            //handle it
                     if(err){
                     res.json({success: false,msg:'Product Failed to Pause'});
                     //throw err;
                     console.log(err);
                 }
                     else{
                         res.json({success: true,msg:'Product Paused Successfully'});
                     }
             });

             
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//Resume Subscription

apiRoutes.post('/resumeProduct/', function(req, res){
	  
  
   
   
    var token = req.body.token;
    var vendorId=req.body.vendorId;
    var isauth= route.memberinfo(token,vendorId);
    var productId=req.body.productId;
    
    var isActive=req.body.isActive;
    
    console.log(isActive+"ProductId"+productId+"HEYYY Yes");
    if(isauth){
        console.log(productId);
       

            
        ActiveSubscription.update({'_id': productId}, { $set: {'isActive':isActive}}, 
        function (err, product) {
            //handle it
                     if(err){
                     res.json({success: false,msg:'Product Failed to Update '});
                     //throw err;
                     console.log(err);
                 }
                     else{
                         res.json({success: true,msg:'Product Resumed Successfully Updated'});
                     }
             });
           

           
   
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

//raw

apiRoutes.post('/updateBrand', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    
    var brandId = req.body.brandId;
    var brandName = req.body.brandName;
    
    
    var isauth= route.memberinfo(token,userId);
    
    if(isauth){
        Brand.update({_id: brandId}, { $set:{
            "brandName":brandName
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Brand Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Brand Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

apiRoutes.post('/updatevendor', function(req, res){
	  

    var token = getToken(req.headers);
    var userId=req.body.userId;
    var vendorId = req.body.vendorId
        var vendorCategoryId = req.body.vendorCategoryId
        var vendorCategoryName = req.body.vendorCategoryId.vendorCategoryName

    
    
    
    
    var isauth= route.memberinfo(token,userId);

    if(isauth){
        Vendor.update({_id: vendorId}, { $set:{
            "vendorCategoryId":vendorCategoryId,
            "vendorCategoryName":vendorCategoryName
            
        }}, function(err, numberAffected, rawResponse) {
           //handle it
                    if(err){
                        console.log(err);
                    res.json({success: false,msg:'Vendor Failed To Update'});
                    throw err;
                }
                    else{
                         
                        res.json({success: true,msg:'Vendor Updated Successfully'});
                    }
        });

     
       
    }
    else{
        res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
    }

});

// user forget password

apiRoutes.post('/getotp', function(req, res){
    
   
    if(req.body.contactNum)
        {
            User.findOne({ 'contactNum': req.body.contactNum }, function(err, user) {
         
         if(!user){
             res.json({success: false, msg: 'No user with this mobile number exist'});
         }
         
         else{
             
            options = {
                 min:0000,
                 max:  9999
              ,
              integer: true
              }
              var pass =  randomNumber(options)
 
         
             
             user.password=pass;
         
             
                User.update({'contactNum': req.body.contactNum}, { $set: {password:user.password}}, function (err, userupdate) {
                    //handle it
                             if(err){
                             res.json({success: false,msg:'Failed to Update Address'});
                             //throw err;
                             console.log(err);
                         }
                            
        
         //push nitification
         var deviceId=user.deviceId;
         console.log("This is device id"+deviceId)
         var otp = user.password;
         console.log("This is otp id"+otp)
         var userName = user.userName;
         axios
         .post('https://fcm.googleapis.com/fcm/send', {
           "notification":{
             "title":"OTP",
             "body":"This is your otp "+otp+".",
             "sound":"default",
             "click_action":"FCM_PLUGIN_ACTIVITY",
             "icon":"fcm_push_icon"
           },
           "data":{
             "landing_page":"login",
             
           },
             "to":deviceId,
             "priority":"high",
             "restricted_package_name":""
         },
         {
           headers: {
            'Content-Type':'application/json',
             'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
           }
       })
         .then(res => {
           console.log(`statusCode: ${res.statusCode}`)
           console.log(res)
         })
         .catch(error => {
           console.error(error)
         })
         
         res.json({success: true,msg:'otp sent Successfully',user:userupdate});
 });

  
        
    }
}); 
        }else{
            res.json({success: false,msg:'Failed To send otp'});
        }
   
    });
        

     apiRoutes.post('/verifyOtp', function(req, res){
        if(req.body.pass)
        {
            User.findOne({ contactNum: req.body.contactNum, password: req.body.pass}, function(err, user) {
         
         if(!user){
             res.json({success: false, msg: 'No user with this mobile number exist'});
         }else{
            res.json({success: true, msg: 'Password set'});
         }
        });
    }
    });

     apiRoutes.post('/setUserPass', function(req, res){
         
        if(req.body.contactNum)
        {
            User.findOne({ 'contactNum': req.body.contactNum}, function(err, user) {
                if(!user){
                    res.json({success: false, msg: 'No user with this mobile number exist'});
                }else{
                    var pass = req.body.pass;
             
                    user.password=pass;
             
                    user.save(function(err,user){
                    User.update({'contactNum': req.body.contactNum}, { $set: {'password':user.password}}, function (err, userupdate) {
                        //handle it
                                 if(err){
                                 res.json({success: false,msg:'Failed to Update password'});
                                 //throw err;
                                 console.log(err);
                             }
                
                            });
                        });
            res.json({success: true, msg: 'Password set'});
         
        
    }
    });

    }else{
        res.json({success: false, msg: 'No contact exist'});
    }
    });


    //vendor forget password

    apiRoutes.post('/getVendorOtp', function(req, res){
    
   
        if(req.body.contactNum)
            {
                Vendor.findOne({ 'vendorContactNumber': req.body.contactNum }, function(err, vendor) {
             
             if(!vendor){
                 res.json({success: false, msg: 'No user with this mobile number exist'});
             }
             
             else{
                 
                options = {
                     min:0000,
                     max:  9999
                  ,
                  integer: true
                  }
                  var pass =  randomNumber(options)
     
             
                 
                 vendor.password=pass;
             
                 
                    Vendor.update({'vendorContactNumber': req.body.contactNum}, { $set: {'password':vendor.password}}, function (err, vendorupdate) {
                        //handle it
                                 if(err){
                                 res.json({success: false,msg:'Failed to Update Address'});
                                 //throw err;
                                 console.log(err);
                             }
                                
            
             //push nitification
             var deviceId=vendor.deviceId;
             var otp = vendor.password;
            
             axios
             .post('https://fcm.googleapis.com/fcm/send', {
               "notification":{
                 "title":"OTP",
                 "body":"This is your otp "+otp+".",
                 "sound":"default",
                 "click_action":"FCM_PLUGIN_ACTIVITY",
                 "icon":"fcm_push_icon"
               },
               "data":{
                 "landing_page":"tabs/tab1",
                 
               },
                 "to":deviceId,
                 "priority":"high",
                 "restricted_package_name":""
             },
             {
               headers: {
                'Content-Type':'application/json',
                 'Authorization': 'key=AAAAdqT0nfo:APA91bH3p5tYgbQPJo8ZVVk_agg1TgU_g9iNaQo7rn4rjvoXAc7mBsHEB6-uz3HUJnboBMIEJU_hsUqkYFZbKFmpvYkwHBhzVCY9NLY8n9gWNDkS9xylEJzkeFgkYVJ8LJYyirqEElfr' 
               }
           })
             .then(res => {
               console.log(`statusCode: ${res.statusCode}`)
               console.log(res)
             })
             .catch(error => {
               console.error(error)
             })
             
             res.json({success: true,msg:'otp sent Successfully',vendor:vendorupdate});
     });
    
      
            
        }
    }); 
            }else{
                res.json({success: false,msg:'Failed To send otp'});
            }
       
        });
            
    
         apiRoutes.post('/verifyVendorOtp', function(req, res){
            if(req.body.pass)
            {
                Vendor.findOne({ 'vendorContactNumber': req.body.contactNum, 'password': req.body.pass}, function(err, vendor) {
             
             if(!vendor){
                 res.json({success: false, msg: 'No user with this mobile number exist'});
             }else{
                res.json({success: true, msg: 'Password set'});
             }
            });
        }
        });
    
         apiRoutes.post('/setVendorPass', function(req, res){
             
            if(req.body.contactNum)
            {
                Vendor.findOne({ 'vendorContactNumber': req.body.contactNum}, function(err, vendor) {
                    if(!vendor){
                        res.json({success: false, msg: 'No user with this mobile number exist'});
                    }else{
                        var pass = req.body.pass;
                 
                        vendor.password=pass;
                 
                        vendor.save(function(err,user){
                        Vendor.update({'vendorContactNumber': req.body.contactNum}, { $set: {'password':vendor.password}}, function (err, userupdate) {
                            //handle it
                                     if(err){
                                     res.json({success: false,msg:'Failed to Update password'});
                                     //throw err;
                                     console.log(err);
                                 }
                    
                                });
                            });
                res.json({success: true, msg: 'Password set'});
             
            
        }
        });
    
        }else{
            res.json({success: false, msg: 'No contact exist'});
        }
        });
   


        //getUserReviews

        apiRoutes.post('/getUserReviews', function(req, res){
	  
  
   
            var vendorId=req.body.vendorId;
            var token = req.body.token;
            var isauth= route.memberinfo(token,vendorId); 
            
            // var productName = req.body.productName;
            
            if(isauth){
        
              
                Order.find({}, function(error, orders) {
                    console.log(orders+"THIS IS user active subscription");
                   
                       
                        if(error){
                         
                            res.json("failed to fetch data");
                             
                         }
                         else{
                            var review=[];
                               var filterOrder = [];
                               for(var x=0;x<orders.length;x++){
                                   for(var y=0;y<orders[x].orderDesc.length;y++){
                                    console.log(orders[x].orderDesc[y].productVendorId);
                                    console.log(vendorId+"vendor id");
                                      if(orders[x].orderDesc[y].productVendorId===vendorId && orders[x].isCancelled===false && orders[x].isRate===true){
                                          filterOrder.push(orders[x]);
                                          console.log(filterOrder+"this is filtered order");
                                       }else{
                                           console.log("Order id does not match");
                                       }
                                       console.log(filterOrder+"this is filtered order");
                                      
                                   
                                   
                                    }
                                   
                               }
                               var odata=[];
                             var comp=[];
                             var newOrder=[];
                                    for(var k=0; k<filterOrder.length;k++){
                                        if(filterOrder[k].status==="Accepted"){
                                            odata.push(filterOrder[k]);
                                        }else if(filterOrder[k].status==="Completed" && filterOrder[k].rate != 0){
                                            comp.push(filterOrder[k]);
                                        
                                        }else{
                                            newOrder.push(filterOrder[k]);
                                        }
                                    }
                              
                              
                              
                               
                             
                      
                         res.json({success:true,msg:'Subscription List fetched successfully',review:comp});
                        
                        }
                    
        
        });
        
                 
            }
            else{
                res.json({success: false,msg:'Unable to fetch Token Authentication failed'});
            }
            
        
        });



apiRoutes.post('/login', route.login);
 apiRoutes.post('/signupUser', route.signupUser);
 apiRoutes.post('/signupDoctor', route.signupDoctor);
 apiRoutes.post('/loginDoctor', route.loginDoctor);
 apiRoutes.post('/signupDoc', route.signupDoc);
apiRoutes.post('/forgot', route.forgot);
// Start the server
app.listen(port);

console.log('Server is running at  http://localhost:' + port);        
        
        