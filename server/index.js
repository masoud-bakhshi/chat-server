const express = require("express");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const http = require("http");

const router = require("./router");
const app1 = express();
const server = http.createServer(app1);

const io = require("socket.io")(server);

// const io = socketio(server);
const cors1 = require("cors");
var compression = require("compression");
var RateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config();
const port = 5000;
app1.use(compression());
app1.use(cors1());
app1.use(router);

//*****************************************DDOs Prevent */
app1.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var limiter = new RateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app1.use(limiter);
//***************************************** */
// io.set("heartbeat interval", 60000);
// io.set("heartbeat timeout", 60000);

io.on("connect", (socket) => {
  try {
    socket.on("join", ({ name, room }, callback) => {
      // console.log("connect");
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, you are chatting with ${user.room.replace(
          user.name,
          ""
        )}.`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} is online!`,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      // console.log(socket.id, "**", message);
      // console.log(user);
      if (user)
        io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("online", ({ name, room }, callback) => {
      //console.log("disconnected: ");
      const user = getUser(socket.id);
      // console.log("on", user);
      if (!user) {
        const { error, user } = addUser({ id: socket.id, name, room });
        // console.log("on", user);
        if (error) return callback(error);

        socket.join(user.room);

        socket.emit("message", {
          user: "admin",
          text: `${user.name}, you are chatting with ${user.room.replace(
            user.name,
            ""
          )}.`,
        });
        socket.broadcast.to(user.room).emit("message", {
          user: "admin",
          text: `${user.name} is online!`,
        });

        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });

        callback();
      }
      callback();
    });

    // socket.on("mydisconnect", () => {
    //   //console.log("disconnected: ");
    //   const user = removeUser(socket.id);

    //   if (user) {
    //     io.to(user.room).emit("message", {
    //       user: "Admin",
    //       text: `${user.name} is off.`,
    //     });
    //     io.to(user.room).emit("roomData", {
    //       room: user.room,
    //       users: getUsersInRoom(user.room),
    //     });
    //   }
    // });

    socket.on("disconnect", () => {
      //console.log("disconnected: ");
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} is off.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  } catch (error) {}
});

server.listen(port, () => console.log(`Server has started.`));
