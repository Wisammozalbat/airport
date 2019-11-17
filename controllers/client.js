const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Client = require("./../helpers/client");

router.get("/", auth, async (req, res) => {
  try {
    let clients = await Client.newClient(req.user.id_user);
    res.status(200).json(clients);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", auth, async (req, res) => {
  if (req.user.type_user_id !== 3) {
    let { name, lastname, birthday, passport } = req.body;
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
