const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    content : {type: String, require: true},
    id_user: {type:mongoose.Schema.Types.ObjectId, require: true},
    createdAt : {type: Date, default: Date.now()}
})

module.exports = mongoose.model("User", UserShema)