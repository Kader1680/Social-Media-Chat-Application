
const http = require("http")
const express = require("express");
const app = express();
const server = http.createServer(app);

// inisilize socket
const socketIO = require('socket.io');
const io = socketIO(server)

io.on('connection', (socket) => {

console.log('New client connected')

})



app.get("/", (req, res)=>{

    res.send("rfdfd")
})

server.listen(3000, (req, res)=>{
   
    
    console.log("Server is running on port 3000")
})