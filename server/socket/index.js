const Chat = require('../model/Chat');

module.exports = function(io) {

  io.on('connection', (socket) => {
      console.log("New client connected:", socket.id);
      
     
      const userId = socket.handshake.auth.userId;
      if (userId) {
          socket.join(userId);
          console.log("User joined their room:", userId);
      }

      socket.on("join", (userId) => {
          if (userId) {
              socket.join(userId);
              console.log("User joined room:", userId);
          }
      });

      
      socket.on('send message', async (data) => {
          try {
              console.log("Received message data:", data);

            
              const messageToSave = {
                  sender: data.senderId,
                  receiver: data.receiverId,
                  content: data.message
              };

              const newMessage = new Chat(messageToSave);
              const savedMessage = await newMessage.save();

              // Format message for frontend
              const messageToSend = {
                  _id: savedMessage._id,
                  senderId: savedMessage.sender,
                  receiverId: savedMessage.receiver,
                  message: savedMessage.content,
                  createdAt: savedMessage.createdAt
              };

               socket.to(data.receiverId).emit("newMessage", messageToSend);
              socket.to(data.senderId).emit("newMessage", messageToSend);

               socket.emit("newMessage", messageToSend);

          } catch (err) {
              console.error("Error sending message:", err);
              socket.emit("messageError", { error: "Failed to send message" });
          }
      });

      socket.on("disconnect", () => {
          console.log("Client disconnected");
      });
  });

};
