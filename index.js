const cl = console.log.bind();

const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

// Socket IO

io.on("connection", client => {
  client.on("user-message", (message) => {
    io.emit("message", message)
  });
});

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(8000, () => {
  cl("Listening on port 8000!");
});
