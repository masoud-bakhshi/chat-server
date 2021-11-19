const db = require("../db/mysql");

chatroom = (req, res) => {
  try {
    const room = req.body.room;
    const firstuser = req.body.firstuser;
    const seconduser = req.body.seconduser;
    if (true) {
      console.log(req.body.firstuser + " ==> " + "chatroom");

      db.query(
        "SELECT * FROM chatroom WHERE room = ?;",
        room,
        (err, result) => {
          if (err) {
            res.send({ err: err });
            console.log(err);
          } else if (!result.length && seconduser != "empty") {
            db.query(
              "INSERT INTO chatroom (room, firstuser, seconduser, date ) VALUES (?,?,?,Now()); ",
              [room, firstuser, seconduser],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                } else {
                  db.query(
                    "SELECT * FROM chatroom WHERE (firstuser = ? OR seconduser = ?) ORDER BY id DESC ;",
                    [firstuser, firstuser],
                    (err, result) => {
                      if (err) {
                        res.send({ err: err });
                      } else if (!result.length) {
                        res.send({ result: "no result" });
                      } else {
                        res.send({ result: result });
                      }
                    }
                  );
                }
              }
            );
          } else {
            db.query(
              "SELECT * FROM chatroom WHERE (firstuser = ? OR seconduser = ?) ORDER BY id DESC ;",
              [firstuser, firstuser],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                } else if (!result.length) {
                  res.send({ result: "no result" });
                } else {
                  res.send({ result: result });
                }
              }
            );
          }
        }
      );
    } else {
      console.log("no auth");
    }
  } catch (error) {}
};
getchatroom = (req, res) => {
  try {
    if (true) {
      console.log(req.body.firstuser + " ==> " + "getchatroom");
      db.query(
        "SELECT * FROM chatroom WHERE (firstuser = ? OR seconduser = ?) ORDER BY id DESC ;",
        [req.body.firstuser, req.body.firstuser],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else if (!result.length) {
            res.send({ result: "no result" });
          } else {
            res.send({ result: result });
          }
        }
      );
    } else {
      res.send({ result: "no result" });
    }
  } catch (error) {}
};

module.exports = { chatroom, getchatroom };
