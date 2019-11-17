const PS = require("pg-promise").PreparedStatement;
let queries = {
  getUser: new PS({
    name: "get-user",
    text: "SELECT * FROM USERS WHERE USERNAME=$1"
  }),
  newUser: new PS({
    name: "new-user",
    text:
      "INSERT INTO USERS (USERNAME, TYPE_USER_ID, PASSWORD) VALUES ($1, $2, $3)"
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
      "UPDATE FLIGHT SET DEP_GATE = $1, DAY = $2, DEPARTURE_TIME = $3, ARRIVAL_TIME = $4, ID_AIRPORT_DEPARTURE = $5, ID_AIRPORT_ARRIVAL = $6 WHERE [ID_FLIGHT = $7]"
  }),
  deleteFlight: new PS({
    name: "delete-flight",
    text: "DELETE FROM fLIGHT WHERE [ID_FLIGHT = $1]"
  }),
  getTicket: new PS({
    name: "get-ticket",
    text: "SELECT * FROM TICKET WHERE ID_FLIGHT = $1 AND ID_CLIENT = $2"
  }),
  newTicket: new PS({
    name: "new-ticket",
    text: "INSERT INTO TICKET (ID_FLIGHT, ID_CLIENT) VALUES ($1, $2)"
  }),
  getClient: new PS({
    name: "get-client",
    text: "SELECT * FROM CLIENT WHERE ID_USER = $1"
  }),
  newClient: new PS({
    name: "new-client",
    text:
      "INSERT INTO CLIENT (NAME, LASTNAME, BIRTHDAY, PASSWORD, ID_USER) VALUES ($1, $2, $3, $4, $5)"
  })
};

module.exports = queries;
