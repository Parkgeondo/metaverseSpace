// express - 호스팅 세팅
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");

// Socket.io 세팅
const { Server } = require("socket.io");
const io = new Server(server);

let sessions = [];

// 소켓 서버 열기 - 포트 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT, process.env.PORT);
});

app.use(express.static(path.join(__dirname, "public")));

console.log(__dirname);

// 호스팅 - index.html 파일을 localhost:8080으로 (react app 사용시 필요없을 듯)
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", function (socket) {
  console.log("a user connected");
  sessions.push(socket.id); // 현재 소켓을 세션 배열에 추가
  io.emit("current-sessions", sessions); // 현재 세션들을 전체 쏴주기 (오브젝트 생성을 위함)
  console.log("current: " + sessions);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    sessions.splice(sessions.indexOf(socket.id), 1);
    io.emit("removed-sessions", socket.id); // 나간 세션 쏴주기 (오브젝트 삭제를 위함)
    console.log("current: " + sessions);
  });

  socket.on("client-to-server", function (data) {
    // console.log(data);
    io.emit("server-to-client", data); // server to clients
  });
});
