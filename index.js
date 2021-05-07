const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "isenc");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, identity, authorization, isenc"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
  }
  next();
});

const PORT = process.env.PORT || 4005;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started at ${PORT} `);
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
