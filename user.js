var mongoose = require("mongoose");
var schema = mongoose.Schema;

var user = new schema({
    email :String,
    username : String,
    password:String
})

module.exports = mongoose.model('users',user);