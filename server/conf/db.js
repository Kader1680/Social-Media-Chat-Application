
const connectDB = async () => {
   try {
      const mongoose = require("mongoose")
<<<<<<< HEAD
      const url = "mongodb+srv://root:0000@chatsystem.sovq17o.mongodb.net/chatdb"
;
      
      
=======
         const url = 'mongodb+srv://root:0000@chatsystem.nrixo.mongodb.net/chatdb';
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
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