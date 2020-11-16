var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var VendorSchema = new Schema({

    clientId :
    {
       type: String
    },
    vendorName:
    {
        type:String,
        required:true
    },
    vendorCategoryId:
    {
        type:String
        
    },
    vendorCategoryName:
    {
        type:String
        
    },
    
    vendorEmailId:
    {
        type:String
    },
    password: {
        type: String,
        required: true
    },
    vendorContactNumber:
    {
        type:Number,
        required:true
    },
    kyc:
    {
        type:Number
    },

    vendorAddress:
    {
        type:String
    },
    vendorUrl:
    {
        type:String
    },
    accessLevelName : {
        type: String
    },
    rate:{
        type:Number,
        default:5
    },
    deviceId: {
        type: String
    },
    
    
    
    
    isActive:{
        type:Boolean,
        default:true
    }

    
});

VendorSchema.pre('save', function (next) {
    var vendor = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(vendor.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                vendor.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
VendorSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
VendorSchema.statics.findOrCreate = function findOrCreate(profile, cb){
    var vendorObj = new this();
    this.findOne({_id : profile.id},function(err,result){ 
        if(!result){
            vendorObj.username = profile.displayName;
            //....
            vendorObj.save(cb);
        }else{
            cb(err,result);
        }
    });
};
module.exports = mongoose.model('Vendor', VendorSchema); 

var Vendor= module.exports = mongoose.model('Vendor', VendorSchema);

module.exports.addVendor = function(vendor, callback){
      console.log("logging in nowwwwww"+vendor);
    
	Vendor.create(vendor, callback);
};