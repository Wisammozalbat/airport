const PS = require("pg-promise").PreparedStatement;
let queries = {
  getUser: new PS({
    name: "get-user",
    text: "SELECT * FROM USERS WHERE USERNAME=$1"
  }),
  newUser: new PS({
    name: "new-user",
    text: "INSERT INTO USERS (USERNAME, PASSWORD) VALUES ($1, $2)"
  }),
  getFlights: new PS({
    name: "get-flights",
    text: "SELECT * FROM FLIGHT WHERE DAY > NOW()"
  }),
  newFlight: new PS({
    name: "new-flight",
    text:
      "INSERT INTO FLIGHT (DEP_GATE, DAY, DEPARTURE_TIME, ARRIVAL_TIME, ID_AIRPORT_DEPARTURE, ID_AIRPORT_ARRIVAL) VALUES ($1, $2, $3, $4, $5, $6)"
  }),
  getFlight: new PS({
    name: "get-flight",
    text: "SELECT * FROM FLIGHT WHERE ID_FLIGHT=$1"
  }),
  updateFlight: new PS({
    name: "update-flight",
    text:
      "UPDATE FLIGHT SET DEP_GATE = $1 DAY = $2 DEPARTURE_TIME = $3 ARRIVAL_TIME = $4 ID_AIRPORT_DEPARTURE = $5 ID_AIRPORT_ARRIVAL = $6 WHERE [ID_FLIGHT = $7]"
  }),
  deleteFlight: new PS({
    name: "delete-flight",
    text: "DELETE FROM fLIGHT WHERE [ID_FLIGHT = $1]"
  }),
  getTicket: new PS({
    name: "get-ticket",
    text: "SELECT * FROM TICKET WHERE ID_USER = $1 ID-FLIGHT = $2"
  }),
  newTicket: new PS({
    name: "new-ticket",
    text: "INSERT INTO USERS (ID_FLIGHT, ID_USER) VALUES ($1, $2)"
  })
};

module.exports = queries;
