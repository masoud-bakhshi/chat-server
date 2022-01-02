const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
// const session = require("express-session");
var session = require("cookie-session");
const dbm = require("../db");
dbm.on("error", console.error.bind(console, "MongoDB connection error:"));
var compression = require("compression");
var RateLimit = require("express-rate-limit");

module.exports = function middlewares(app) {
  app.use(compression());
  app.use(express.json());

  app.use(
    cors({
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    })
  );
  //*****************************************DDOs Prevent */
  app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

  var limiter = new RateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  });

  //  apply to all requests
  app.use(limiter);
  //***************************************** */
  //************************************************cache*/

  //************************************************************** */
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24 * 1000,
      },
    })
  );
  return app;
};
