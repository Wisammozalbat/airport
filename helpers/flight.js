const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

module.exports.newFlight = async (
  DEP_GATE,
  DAY,
  DEPARTURE_TIME,
  ARRIVAL_TIME,
  ID_AIRPORT_DEPARTURE,
  ID_AIRPORT_ARRIVAL
) => {
  try {
    const data = await db.none(query.newFlight, [
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL
    ]);
    return { status: 201, msg: "created", data };
  } catch (e) {
    return { error: e, status: 403, msg: "forbidden fuck u" };
  }
};
