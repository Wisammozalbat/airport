const db = require("./../helpers/db.js");
const query = require("./../helpers/queries").default;

module.exports.newClient = async (
  name,
  lastname,
  birthday,
  passport,
  userId
) => {
  try {
    const data = await db.none(query.newClient, [
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

module.exports.getClients = async userId => {
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
