var mongoose = require('mongoose');
const { Email } = require('node-ses');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var SearchSchema = new Schema({
    searchTerm:{
        type:String,
    },
    category:{
        type:String,
    },
});

var Search= module.exports = mongoose.model('search', SearchSchema);

module.exports.addSearch = function(search, callback){
      console.log("logging in nowwwwww"+search);
    
	Search.create(search, callback);
};