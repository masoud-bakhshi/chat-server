module.exports = function routes(app) {
  //***************************************************************database chat */
  const chatdbCtr = require("../controllers/chatdb.controller");
  app.post("/insertchat", chatdbCtr.insertchat);
  app.get("/getchat", chatdbCtr.getchat);

  const chatroomCtr = require("../controllers/chatroom.controller");
  app.post("/chatroom", chatroomCtr.chatroom);
  app.get("/getchatroom", chatroomCtr.getchatroom);
  return app;
};
