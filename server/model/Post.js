const mongoose = require("mongoose")

const PostShema = new mongoose.Schema({
    content : {type: String, require: true},
    media : {type: String, default: null},
    id_user: {type:mongoose.Schema.Types.ObjectId, require: true},
    createdAt : {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Post", PostShema)