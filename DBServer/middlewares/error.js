module.exports = function middlewares(app) {
  app.use(function errorHandler(err, req, res, next) {
    if (err.status) {
      return res.status(err.status).json({
        status: "error",
        message: err.message,
        auth: false,
        loggedIn: false,
      });
    }
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
      auth: false,
    });
  });
};
