const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Airport = require("./../helpers/airport");

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

//actualizar los datos del aeropuert
router.put("/:airportId", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const { airportId } = req.params;
    const { name, country } = req.body;
    try {
      const airport = await Airport.getAirportById(airportId);
      if (airport.data === null) {
        res.status(503).json({ message: "no existe" });
        return;
      }
      const data = await Airport.updateAirport(name, country, airportId);
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

//borrar los datos del aeropuerto
router.delete("/", auth, async (req, res) => {});

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
