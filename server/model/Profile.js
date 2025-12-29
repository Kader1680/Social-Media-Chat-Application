const mongoose = require("mongoose")

const ProfileShema = new mongoose.Schema({
    first_name : {type: String , default: null},
    last_name : {type: String, default: null},
    bio : {type: String, default: null},
    avatar : {type: String, default: null},
    cover_photo : {type: String, default: null},
    address : {type: String, default: null},
    phone : {type: String, default: null},
    home: {type: String, default: null},
    workplace : {type: String, default: null},
    education : {type: String, default: null},
    id_user: {type:mongoose.Schema.Types.ObjectId, require: true, ref:"User"},
    createdAt : {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Profile", ProfileShema)