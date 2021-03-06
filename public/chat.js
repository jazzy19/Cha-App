var socket = io.connect(`https://chat-app-by-jay.herokuapp.com/`);
// var HOST = location.origin.replace(/^http/, "ws");
// var socket = new WebSocket(HOST);

//Dom Query
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//Emitting Events
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});
//Listern For the Event

socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
