const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chat = new Schema(
  {
    user: { type: String, required: true },
    text: { type: String, required: false },
    room: { type: String, required: true },
  },
  { timestamps: true }
);
//
module.exports = mongoose.model("chat", Chat);
