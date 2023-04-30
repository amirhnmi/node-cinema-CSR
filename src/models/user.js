const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp")

const UserSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    username: {type: String, required: true},
    phone_number: {type: String, required: true},
    password: {type: String, required: true},
    isadmin: {type: Boolean, default:false}
})
mongoose.plugin(timestamp);



const User = mongoose.model("User", UserSchema);


module.exports = User