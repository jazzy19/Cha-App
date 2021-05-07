const express = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.static("public"));

const PORT = 4005;
const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server Started at ${process.env.PORT} `);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("Connected Established Between Sockets", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
