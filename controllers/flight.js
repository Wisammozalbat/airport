const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");
const Flight = require('./../helpers/flight');

router.get("/", async (req, res) => {
  let vuelos = await db.any(query.getFlights);
  console.log(vuelos);
  res.json(vuelos);
});

router.post("/", auth, (req, res) => {
  let {DEP_GATE, DAY, DEPARTURE_TIME, ARRIVAL_TIME, ID_AIRPORT_DEPARTURE, ID_AIRPORT_ARRIVAL} = req.body;
    try{
      const data = await Flight.newFlight(DEP_GATE, DAY, DEPARTURE_TIME, ARRIVAL_TIME, ID_AIRPORT_DEPARTURE, ID_AIRPORT_ARRIVAL);
      res.status(201).send({...data});
    }catch(e){
      res.status(403).send({...e});
    }
});

router.put("/", auth, (req, res) => {
  res.send("Aqui se editaran los vuelo");
});

router.get("/:id", (req, res) => {
  let vuelo = await db.any(query.getFlight, [req.params.id]);
  console.log(vuelo);
  res.json(vuelo);
});

router.get("/:id/reserve", auth, (req, res) => {
  res.send("Aqui es donde se reservaran los tickets de los vuelos");
});

router.post("/:id/reserve", auth, (req, res) => {
  const { name, lastname, passportID, age } = req.body;
  const { id } = req.params;
  res.send("Aqui es donde se añaden las reservas de los vuelos");
  console.log(req.body);
  console.log(req.params);
});

module.exports = router;
