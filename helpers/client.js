const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

module.exports.newClient = async (
  name,
  lastname,
  birthday,
  passport,
  userId
) => {
  try {
    const data = await db.one(query.newClient, [
      name,
      lastname,
      birthday,
      passport,
      userId
    ]);
    return { status: 201, msg: "new client created", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};

module.exports.deleteClient = async passport => {
  try {
    const data = await db.one(query.deleteClient, [passport]);
    return { status: 201, msg: "client deleted", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};

module.exports.getClient = async userId => {
  try {
    const data = await db.any(query.getClient, [userId]);
    return { status: 200, msg: "get client", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};
