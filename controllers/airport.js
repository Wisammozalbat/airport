const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Airport = require("./../helpers/airport");
const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

router.get("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    let airports = await Airport.getAllAirports();
    airports = airports.sort(compare);
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
    let { name, country, latitud, longitud } = req.body;
    try {
      const airport = await Airport.getAirport(name);
      if (airport.data !== null) {
        res.status(503).json({ message: "ya existe" });
        return;
      }
      const data = await Airport.newAirport(name, country, latitud, longitud);
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

router.put("/:airportId", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const { airportId } = req.params;
    const { name, country, latitud, longitud } = req.body;
    try {
      const airport = await Airport.getAirportById(airportId);
      if (airport.data === null) {
        res.status(503).json({ message: "no existe" });
        return;
      }
      const data = await Airport.updateAirport(
        name,
        country,
        latitud,
        longitud,
        airportId
      );
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

router.delete("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const { id_airport } = req.body;
    const data = await db.oneOrNone(query.getAirportById, [id_airport]);
    console.log(data);
    if (data === null) {
      res.status(503).json({ message: "airport no existe" });
      return;
    }
    try {
      const data = await Airport.deleteAirport(id_airport);
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
  if (a.id_airport < b.id_airport) {
    return -1;
  }
  if (a.id_airport > b.id_airport) {
    return 1;
  }
  return 0;
}

module.exports = router;
