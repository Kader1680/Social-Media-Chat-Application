
const http = require("http")
const express = require("express");
const app = express();
const server = http.createServer(app);



server.listen(3000, (req, res)=>{
    
    console.log("Server is running on port 3000")
})