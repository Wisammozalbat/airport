const db = require("./db");
const bcrypt = require("bcryptjs");
const sql = require("./queries.js");

module.exports.getUserByUsername = username => {
  return new Promise((res, rej) => {
    db.connect()
      .then(obj => {
        obj
          .one(sql.getUser, [username])
          .then(data => {
            res(data);
            obj.done();
          })
          .catch(error => {
            console.log(error);
            rej(error);
            obj.done();
          });
      })
      .catch(error => {
        console.log(error);
        rej(error);
      });
  });
};

module.exports.getAllUsers = () => {
  try {
    const allUsers = db.any(sql.getAllUser);
    return allUsers;
  } catch (e) {
    res.status(500).json({
      message: "unable to access"
    });
  }
};

module.exports.comparePassword = (candidatePassword, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if (err) throw rej(err);
      res(isMatch);
    });
  });
};

module.exports.registerAirline = (airline, country, userId) => {
  try {
    const newAirline = db.one(sql.newAirline, [airline, country, userId]);
    return newAirline.data;
  } catch (e) {
    return e;
  }
};

module.exports.registerUser = (username, password, type) => {
  return new Promise((res, rej) => {
    db.connect().then(obj => {
      obj
        .one(sql.newUser, [username, type, password])
        .then(data => {
          res({
            message: "OK",
            status: 200,
            data
          });
          obj.done();
        })
        .catch(error => {
          rej({
            error: error,
            msg: "not Created",
            status: 500
          });
          obj.done();
        });
    });
  });
};

module.exports.deleteUser = username => {
  try {
    const user = db.none(sql.deleteUser, [username]);
    return user.data;
  } catch (e) {
    return e;
  }
};
