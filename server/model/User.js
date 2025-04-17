const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    name : {type: "string"},
    gender : {type: "string"},
    email : {type: "string"},
    password : {type: "string"},
 
})

module.exports = mongoose.model("User", UserShema)