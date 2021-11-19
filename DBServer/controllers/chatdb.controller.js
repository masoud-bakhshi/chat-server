const Chat = require("../models/chat-model");

insertchat = (req, res) => {
  try {
    // console.log(req.body);
    const body = req.body;
    if (!body || !req.body.user) {
      return res.status(400).json({
        success: false,
        error: "You must provide a chat",
      });
    }

    const chat = new Chat(body);

    if (!chat) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log(req.body + " ==> " + "insertchat");

    chat
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: chat._id,
          message: "Chat created!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          error,
          message: "Chat not created!",
        });
      });
  } catch (error) {}
};
getchat = async (req, res) => {
  try {
    console.log(req.body);
    const room = req.query.id.split("---")[0];
    const numMessage = parseInt(req.query.id.split("---")[1]);

    // if (room.includes(req.body.user)) {
    if (true) {
      await Chat.find({ room: room }, (err, chats) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        // if (!chats.length) {
        ///   return res.status(404).json({ success: false, error: `Chat not found` });
        // }
        else {
          console.log(req.body + " ==> " + "getchat");

          return res.status(200).json({ success: true, data: chats.reverse() });
        }
      })
        .sort({ _id: -1 })
        .limit(numMessage)
        .catch((err) => console.log(err));
    } else {
      return res.status(404).json({ success: false, error: "no result" });
    }
  } catch (error) {}
};
module.exports = {
  insertchat,
  getchat,
};
