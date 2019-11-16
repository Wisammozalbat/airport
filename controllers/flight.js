const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const db = require("./../helpers/db.js");
const query = require("./../helpers/queries").default;
const Flight = require("./../helpers/flight");

router.get("/", async (req, res) => {
  try {
    let vuelos = await db.any(query.getFlights);
    if (vuelos.length === 0) {
      res.status(203).send({ msg: "not found" });
      return;
    }
    res.status(200).json(vuelos);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", auth, async (req, res) => {
  if (req.user.type_user_id === 3) {
    let {
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL
    } = req.body;
    try {
      const data = await Flight.newFlight(
        DEP_GATE,
        DAY,
        DEPARTURE_TIME,
        ARRIVAL_TIME,
        ID_AIRPORT_DEPARTURE,
        ID_AIRPORT_ARRIVAL
      );
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

router.delete("/:id", auth, async (req, res) => {
  if (req.user.type_user_id === 3) {
    let { id } = req.params;
    try {
      await db.none(query.deleteFlight, [id]);
      res.status(201).json({ message: "Vuelo eliminado exitosamente" });
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

router.put("/:id", auth, async (req, res) => {
  if (req.user.type_user_id === 3) {
    let {
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL
    } = req.body;
    try {
      const data = await Flight.updateFlight(
        DEP_GATE,
        DAY,
        DEPARTURE_TIME,
        ARRIVAL_TIME,
        ID_AIRPORT_DEPARTURE,
        ID_AIRPORT_ARRIVAL,
        req.params.id
      );
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

router.get("/:id", async (req, res) => {
  try {
    let vuelo = await db.any(query.getFlight, [req.params.id]);
    res.status(200).json({ ...vuelo });
  } catch (e) {
    res.status(403).send({ ...e });
  }
});

router.get("/:id/reserve", auth, (req, res) => {
  res.send("Aqui es donde se mostraran los tickets del vuelo reservado");
});

router.post("/:id/reserve", auth, async (req, res) => {
  try {
    const data = await db.oneOrNone(query.getTicket, [
      req.user.id_user,
      req.params.id
    ]);
    if (data !== null) {
      res
        .status(409)
        .json({ message: "El usuario ya posee pasaje para este vuelo" });
      return;
    }
    if (req.user.type_user_id !== 3) {
      const { name, lastname, birthday, passportID } = req.body;
      const { id } = req.params;
      const data = await Flight.newTicket(
        name,
        lastname,
        birthday,
        passportID,
        req.user.id_user,
        id
      );
      res.status(201).send({ ...data });
    } else {
      res.status(401).json({
        message: "Forbidden action for user",
        status: "401"
      });
    }
  } catch (e) {
    res.status(403).send({ ...e });
  }
});

module.exports = router;
