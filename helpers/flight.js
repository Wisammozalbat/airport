const db = require("./../helpers/db");
const query = require("./../helpers/queries");

module.exports.newFlight = async (
  DEP_GATE,
  DAY,
  DEPARTURE_TIME,
  ARRIVAL_TIME,
  ID_AIRPORT_DEPARTURE,
  ID_AIRPORT_ARRIVAL,
  STATUS
) => {
  try {
    const data = await db.one(query.newFlight, [
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL,
      STATUS
    ]);
    console.log("vuelo creado ", data);
    return { status: 201, msg: "created", data };
  } catch (e) {
    return {
      error: e,
      status: 503,
      msg: "Failed at connecting to the data base"
    };
  }
};

module.exports.updateFlight = async (
  DEP_GATE,
  DAY,
  DEPARTURE_TIME,
  ARRIVAL_TIME,
  ID_AIRPORT_DEPARTURE,
  ID_AIRPORT_ARRIVAL,
  STATUS,
  flightId,
  description,
  airline_flight_id
) => {
  try {
    const data = await db.one(query.updateFlight, [
      DEP_GATE,
      DAY,
      DEPARTURE_TIME,
      ARRIVAL_TIME,
      ID_AIRPORT_DEPARTURE,
      ID_AIRPORT_ARRIVAL,
      STATUS,
      flightId
    ]);
    console.log(data);
    const airline_flight = await db.one(query.updateAirlineFlight, [
      description,
      airline_flight_id
    ]);
    console.log(airline_flight);
    return { status: 201, msg: "created", data, airline_flight };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};
