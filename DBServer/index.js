const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const middlewares = require("./middlewares/index");
const routes = require("./routes/index");
const errors = require("./middlewares/error");

let api = middlewares(app);
routes(api);
errors(app);
const port = 3001;

app.listen(port, () => {
  console.log("running Main server");
});

// app.listen(3001, () => {
//   console.log("running Main server");
// });
