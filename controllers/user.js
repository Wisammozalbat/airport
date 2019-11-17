const express = require("express");
const auth = require("./../middlewares/jwtAuth");
let router = express.Router();
const Users = require("./../helpers/users");
const db = require("./../helpers/db");
const query = require("./../helpers/queries");

router.get("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const users = await Users.getAllUsers();
    console.log(users);
    res.status(200).json({
      message: "users: ",
      data: users
    });
  } else {
    res.status(401).json({
      message: "Forbidden action for user",
      status: "401"
    });
  }
});

router.delete("/", auth, async (req, res) => {
  if (req.user.type_user_id === 2) {
    const { username } = req.body;
    const data = await db.oneOrNone(query.getUser, [username]);
    if (data === null) {
      res.status(503).json({ message: "usuario no existe" });
      return;
    }
    const users = await Users.deleteUser(username);
    const allUsers = await Users.getAllUsers();
    console.log(allUsers);
    res.status(200).json({
      message: "user deleted",
      userDeleted: username,
      data: allUsers
    });
  } else {
    res.status(401).json({
      message: "Forbidden action for user",
      status: "401"
    });
  }
});

module.exports = router;
