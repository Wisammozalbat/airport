const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Airline = require("./../helpers/airline");
const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

router.get("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    let airlines = await Airline.getAllAirlines();
    airlines = airlines.sort(compare);
    console.log(airlines);
    res.status(200).json({
      message: "airlines",
      data: airlines
    });
  } else {
    res.status(401).json({
      message: "Forbidden action for user",
      status: "401"
    });
  }
});

router.put("/:airlineId", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const { airlineId } = req.params;
    const { name, country } = req.body;
    try {
      const airline = await Airline.getairlineById(airlineId);
      if (airline.data === null) {
        res.status(404).json({ message: "aerolinea no encontrada" });
        return;
      }
      const data = await Airline.updateAirline(name, country, airlineId);
      console.log(data);
      res.status(201).send({ ...data.data });
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

router.delete("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const { id_airline } = req.body;
    const data = await db.oneOrNone(query.getAirlineById, [id_airline]);
    console.log(data);
    if (data === null) {
      res.status(503).json({ message: "airline no existe" });
      return;
    }
    try {
      const data = await Airline.deleteAirline(id_airline);
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

function compare(a, b) {
  if (a.id_airline < b.id_airline) {
    return -1;
  }
  if (a.id_airline > b.id_airline) {
    return 1;
  }
  return 0;
}

module.exports = router;
