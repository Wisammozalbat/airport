const express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
const User = require("./../helpers/users");
const db = require("./../helpers/db");
const query = require("./../helpers/queries");

router.post("/signup", (req, res) => {
  db.oneOrNone(query.getUser, [req.body.username])
    .then(data => {
      if (data !== null) {
        res.status(409).json({ message: "usuario ya existe" });
        return;
      }
      User.registerUser(
        req.body.username,
        bcrypt.hashSync(req.body.password, 10),
        2
      )
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.status(503).json({
        message: "Ya existe el usuario",
        err
      });
    });
});

module.exports = router;
