const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Airport = require("./../helpers/airport");

router.get("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const airports = await Airport.getAllAirports();
    console.log(airports);
    res.status(200).json({
      message: "airports",
      data: airports
    });
  } else {
    res.status(401).json({
      message: "Forbidden action for user",
      status: "401"
    });
  }
});

router.post("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    let { name, country } = req.body;
    try {
      const airport = await Airport.getAirport(name);
      if (airport.data !== null) {
        res.status(503).json({ message: "ya existe" });
        return;
      }
      const data = await Airport.newAirport(name, country);
      console.log(data);
      res.status(201).send({ ...data });
    } catch (e) {
      res.status(403).send({ ...e });
    }
  } else {
    res.status(401).json({
      message: "Forbidden action for user",
      status: "401"
    });
  }
});

module.exports = router;
