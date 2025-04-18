
const connectDB = async () => {
   try {
      const mongoose = require("mongoose")
      const url = 'mongodb+srv://root:0000@chatsystem.nrixo.mongodb.net/chatdb';
      mongoose.connect(url)
      .then(()=>{
      console.log("connected with mongodb")
      })
      .catch((err)=>{
      console.log("error connected :  ", err)
      })
 
   } catch (err) {
    console.log("error : ", err)
   }
}
module.exports = connectDB;