const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    title : {type: "string", require: true},
    body : {type: "string", require: true},
    id_user: {type:mongoose.Schema.Types.ObjectId, require: true},
    createdAt : {type: Date, default: Date.now()}
})

module.exports = mongoose.model("User", UserShema)