const express = require("express");
const passport = require("passport");
const auth = require("./../middlewares/jwtAuth");
const jwt = require("jsonwebtoken");
let router = express.Router();
const config = require("./../helpers/config");

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, function(err, user, info) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({
        err: info
      });
    }
    req.logIn(user, { session: false }, function(err) {
      if (err) {
        return res.status(500).send({
          err: "Could not log in user"
        });
      }

      let jsonWebToken = jwt.sign(user, config.secret);
      res.status(200).send({
        status: 200,
        message: "Login Successful",
        token: jsonWebToken,
        user: {
          id: user.id_user,
          username: user.username,
          type: user.type_user_id
        }
      });
    });
  })(req, res, next);
});

router.get("/logout", function(req, res) {
  req.logout();
  console.log("Log out");
  res.status(200).send({
    status: "Bye!"
  });
});

module.exports = router;
