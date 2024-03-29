const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

module.exports.newTicket = async (flightId, clientId) => {
  try {
    const data = await db.one(query.newTicket, [flightId, clientId]);
    return { status: 201, msg: "created", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};

module.exports.getTicket = async (flightId, clientId) => {
  try {
    const data = await db.any(query.getTicket, [flightId, clientId]);
    return { status: 200, msg: "created", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};
