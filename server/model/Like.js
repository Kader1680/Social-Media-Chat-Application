const mongoose = require("mongoose")

const LikeShema = new mongoose.Schema({
    id_user: {type:mongoose.Schema.Types.ObjectId, require: true},
    id_post: {type:mongoose.Schema.Types.ObjectId, require: true},
})

module.exports = mongoose.model("Like", LikeShema)