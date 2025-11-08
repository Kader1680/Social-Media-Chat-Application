const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  datebirth: { type: Date, default: null },
  school: { type: String, default: null },
  home: { type: String, default: null },
  live: { type: String, default: null },
  work: { type: String, default: null },
  gender: { type: String, enum: ['male', 'female'], default: null },
  image: { type: String, default: null },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,  
    ref: 'User',
    unique: true
  }
}, { timestamps: true });  

module.exports = mongoose.model("Profile", ProfileSchema);
