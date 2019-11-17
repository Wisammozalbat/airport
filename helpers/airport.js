const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

module.exports.newAirport = async (name, country) => {
  try {
    const data = await db.one(query.newAirport, [name, country]);
    return { status: 200, msg: "new airport created", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base "
    };
  }
};

module.exports.getAirport = async name => {
  try {
    const data = await db.oneOrNone(query.getAirport, [name]);
    console.log(data);
    return { status: 201, msg: "airport gotted", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};

module.exports.getAllAirports = async () => {
  try {
    const allAirports = await db.any(query.getAllAirports);
    console.log(allAirports);
    return allAirports;
  } catch (e) {
    return e;
  }
};
