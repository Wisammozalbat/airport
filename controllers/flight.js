const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");
const Flight = require("./../helpers/flight");
const Ticket = require("./../helpers/ticket");
const Client = require("./../helpers/client");
const Instapago = require("./../helpers/instapago");

router.get("/", async (req, res) => {
  try {
    let vuelos = await db.any(query.getFlights);
    if (vuelos.length === 0) {
      res.status(203).send({ msg: "vuelos no disponibles" });
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
      description,
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL,
      STATUS
    } = req.body;
    try {
      const flight = await db.oneOrNone(
        "Select * from flight where id_flight = 2"
      );
      const data = await Flight.newFlight(
        DEP_GATE,
        DAY,
        DEPARTURE_TIME,
        ARRIVAL_TIME,
        ID_AIRPORT_DEPARTURE,
        ID_AIRPORT_ARRIVAL,
        STATUS
      );
      const airline = await db.one(query.getAirlineByUserId, [
        req.user.id_user
      ]);
      console.log(query.newAirlineFlight);
      const newFlight = await db.one(query.newAirlineFlight, [
        description,
        airline.id_airline,
        data.data.id_flight
      ]);
      console.log("new flight ", newFlight);
      res.status(201).send({ ...data, newFlight });
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

router.delete("/:flightId", auth, async (req, res) => {
  if (req.user.type_user_id === 3) {
    let { flightId } = req.params;
    const check = await db.oneOrNone(query.getFlight, [flightId]);
    if (check === null) {
      res.status(404).json({
        message: "Info not found",
        status: "404"
      });
    }
    try {
      await db.none(query.deleteFlight, [flightId]);
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

router.put("/:flightId", auth, async (req, res) => {
  if (req.user.type_user_id === 3) {
    const { flightId } = req.params;
    const check = await db.oneOrNone(query.getFlight, [flightId]);
    if (check === null) {
      res.status(404).json({
        message: "Info not found",
        status: "404"
      });
    }
    let {
      description,
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL,
      STATUS
    } = req.body;
    const airline = await db.one(query.getAirlineFlight, [flightId]);
    try {
      const data = await Flight.updateFlight(
        DEP_GATE,
        DAY,
        DEPARTURE_TIME,
        ARRIVAL_TIME,
        ID_AIRPORT_DEPARTURE,
        ID_AIRPORT_ARRIVAL,
        STATUS,
        flightId,
        description,
        airline.airline_flight_id
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

router.post("/:flightId/reserve", auth, async (req, res) => {
  const {
    clientId,
    amount,
    description,
    cardholder,
    cardholderid,
    cardnumber,
    cvc,
    expirationdate,
    statusid,
    ip
  } = req.body;
  const { flightId } = req.params;
  try {
    const pago = await Instapago.payTicket(
      amount,
      description,
      cardholder,
      cardholderid,
      cardnumber,
      cvc,
      expirationdate,
      statusid,
      ip
    );
    if (pago.success) {
      const data = await Ticket.getTicket(flightId, clientId);
      if (data !== null) {
        res
          .status(409)
          .json({ message: "Este cliente ya posee pasaje para este vuelo" });
        return;
      }
      if (req.user.type_user_id !== 3) {
        const data = await Ticket.newTicket(flightId, clientId);
        res.status(201).send({ ...data });
      } else {
        res.status(401).json({
          message: "Forbidden action for user",
          status: "401"
        });
      }
    } else {
      res.status(501).json({
        message: "pago no pudo ser procesado"
      });
    }
  } catch (e) {
    res.status(403).send({ ...e });
  }
});

router.get("/:flightId/:userId", auth, async (req, res) => {
  const { flightId, userId } = req.params;
  try {
    let clients = await Client.getClient(userId);
    let tickets = [];
    for (let i of clients) {
      const clientId = i.id_user;
      let ticket = await Ticket.getTicket(flightId, clientId);
      tickets.push(ticket.data);
    }
    tickets = tickets.sort(compare);
    res.status(200).json({ data: tickets });
  } catch (e) {
    res.status(403).send({ ...e });
  }
  res.send();
});

function compare(a, b) {
  if (a.id_flight < b.id_flight) {
    return -1;
  }
  if (a.id_flight > b.id_flight) {
    return 1;
  }
  return 0;
}

module.exports = router;
