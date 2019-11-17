const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Client = require("./../helpers/client");
const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

router.get("/", auth, async (req, res) => {
  try {
    let clients = await Client.getClient(req.user.id_user);
    res.status(200).json(clients);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  if (req.user.type_user_id !== 3) {
    const { name, lastname, birthday, passport } = req.body;
    const data = await db.oneOrNone(query.getClientByPassport, [passport]);
    console.log(data);
    if (data !== null) {
      res.status(503).json({ message: "cliente ya existe" });
      return;
    }
    try {
      const data = await Client.newClient(
        name,
        lastname,
        birthday,
        passport,
        req.user.id_user
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

router.delete("/", async (req, res) => {
  if (req.user.type_user_id !== 3) {
    const { passport } = req.body;
    const data = await db.oneOrNone(query.getClientByPassport, [passport]);
    console.log(data);
    if (data === null) {
      res.status(503).json({ message: "cliente no existe" });
      return;
    }
    try {
      const data = await Client.deleteClient(passport);
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
