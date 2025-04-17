const mongoose = require("mongoose")

const ChatShema = new mongoose.Schema({
    sender : {type: mongoose.Schema.Types.ObjectId, require: true},
    receiver : {type: mongoose.Schema.Types.ObjectId , require: true},
    content : {type: "string" , require: true},
    // chatRoom : {type: mongoose.Schema.Types.ObjectId, require: true},
    // status : {type: "string", enum : ["sent", "delivered", "read"], default: "sent"},
    createdAt : {type: Date, default: Date.now()}

})

module.exports = mongoose.model("ChatShema", ChatShema)