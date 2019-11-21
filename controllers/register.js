const express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
const User = require("./../helpers/users");
const Airline = require("./../helpers/airline");
const db = require("./../helpers/db");
const query = require("./../helpers/queries");

router.post("/signupAirline", auth, async (req, res) => {
  if (req.user.type_user_id !== 1) {
    const { airlineName, country, username, password } = req.body;
    const type_user_id = 3;
    try {
      const data = await db.oneOrNone(query.getUser, [username]);
      if (data !== null) {
        res.status(503).json({ message: "usuario ya existe" });
        return;
      }
      const airlineData = await db.oneOrNone(query.getAirline, [airlineName]);
      if (airlineData !== null) {
        res.status(503).json({ message: "aerolinea ya existe" });
        return;
      }
      const user = await User.registerUser(
        username,
        bcrypt.hashSync(password, 10),
        type_user_id
      );
      const airline = await Airline.newAirline(
        airlineName,
        country,
        user.data.id_user
      );
      res.status(201).json({
        user,
        airline,
        message: "successfully created"
      });
    } catch (err) {
      res.status(503).json({
        message: "Ya existe el usuario",
        err
      });
    }
  } else {
    res.status(403).json({
      message: "Prohibido el acceso a esta funcionalidad"
    });
  }
});

router.post("/signup", (req, res) => {
  db.oneOrNone(query.getUser, [req.body.username])
    .then(data => {
      if (data !== null) {
        res.status(409).json({ message: "usuario ya existe" });
        return;
      }
      if (req.body.username === "" || req.user.password === "") {
        res.status(409).json({ message: "no se aceptan parametros vacios" });
        return;
      }
      User.registerUser(
        req.body.username,
        bcrypt.hashSync(req.body.password, 10),
        req.body.type_user_id
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
