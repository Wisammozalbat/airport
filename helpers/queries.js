const PS = require("pg-promise").PreparedStatement;
let queries = {
  getUser: new PS({
    name: "get-user",
    text: "SELECT * FROM USERS WHERE USERNAME=$1"
  }),
  getAllUser: new PS({
    name: "get-all-user",
    text: "SELECT * FROM USERS"
  }),
  newUser: new PS({
    name: "new-user",
    text:
      "INSERT INTO USERS (USERNAME, TYPE_USER_ID, PASSWORD) VALUES ($1, $2, $3) RETURNING *"
  }),
  deleteUser: new PS({
    name: "delete-user",
    text: "DELETE FROM USERS WHERE USERNAME = $1"
  }),
  getFlights: new PS({
    name: "get-flights",
    text: "SELECT * FROM FLIGHT WHERE DAY > NOW()"
  }),
  newFlight: new PS({
    name: "new-flight",
    text:
      "INSERT INTO FLIGHT (DEP_GATE, DAY, DEPARTURE_TIME, ARRIVAL_TIME, ID_AIRPORT_DEPARTURE, ID_AIRPORT_ARRIVAL, STATUS) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
  }),
  getFlight: new PS({
    name: "get-flight",
    text: "SELECT * FROM FLIGHT WHERE ID_FLIGHT=$1"
  }),
  updateFlight: new PS({
    name: "update-flight",
    text:
      "UPDATE FLIGHT SET DEP_GATE = $1, DAY = $2, DEPARTURE_TIME = $3, ARRIVAL_TIME = $4, ID_AIRPORT_DEPARTURE = $5, ID_AIRPORT_ARRIVAL = $6, STATUS = $7 WHERE ID_FLIGHT = $8 RETURNING *"
  }),
  deleteFlight: new PS({
    name: "delete-flight",
    text: "DELETE FROM FLIGHT WHERE ID_FLIGHT = $1"
  }),
  getTicket: new PS({
    name: "get-ticket",
    text: "SELECT * FROM TICKET WHERE ID_FLIGHT = $1 AND ID_CLIENT = $2"
  }),
  newTicket: new PS({
    name: "new-ticket",
    text:
      "INSERT INTO TICKET (ID_FLIGHT, ID_CLIENT) VALUES ($1, $2) RETURNING *"
  }),
  getClient: new PS({
    name: "get-client",
    text: "SELECT * FROM CLIENT WHERE ID_USER = $1"
  }),
  getClientByPassport: new PS({
    name: "get-client-by-passport",
    text: "SELECT * FROM CLIENT WHERE PASSPORT = $1"
  }),
  newClient: new PS({
    name: "new-client",
    text:
      "INSERT INTO CLIENT (NAME, LASTNAME, BIRTHDAY, PASSPORT, ID_USER) VALUES ($1, $2, $3, $4, $5) RETURNING *"
  }),
  deleteClient: new PS({
    name: "delete-client",
    text: "DELETE FROM CLIENT WHERE PASSPORT = $1"
  }),
  newAirline: new PS({
    name: "new-airline",
    text:
      "INSERT INTO AIRLINE (NAME, COUNTRY, ID_USER) VALUES ($1, $2, $3) RETURNING *"
  }),
  getAirline: new PS({
    name: "get-airline",
    text: "SELECT * FROM AIRLINE WHERE NAME = $1"
  }),
  getAirlineByUserId: new PS({
    name: "get-airline-by-user-id",
    text: "SELECT * FROM AIRLINE WHERE ID_USER = $1"
  }),
  newAirlineFlight: new PS({
    name: "new-airline-flight",
    text:
      "INSERT INTO AIRLINE_FLIGHT (DESCRIPTION, ID_AIRLINE, ID_FLIGHT) VALUES ($1, $2, $3) RETURNING *"
  }),
  getAirlineFlight: new PS({
    name: "get-airline-flight",
    text: "SELECT * FROM AIRLINE_FLIGHT WHERE ID_FLIGHT = $1"
  }),
  updateAirlineFlight: new PS({
    name: "update-airline-flight",
    text:
      "UPDATE AIRLINE_FLIGHT SET DESCRIPTION = $1 WHERE AIRLINE_FLIGHT_ID = $2 RETURNING *"
  }),
  newAirport: new PS({
    name: "new-airport",
    text: "INSERT INTO AIRPORT (NAME, COUNTRY) VALUES ($1, $2) RETURNING *"
  }),
  getAirport: new PS({
    name: "get-airport",
    text: "SELECT * FROM AIRPORT WHERE NAME = $1"
  }),
  getAllAirports: new PS({
    name: "get-all-airports",
    text: "SELECT * FROM AIRPORT"
  })
};

module.exports = queries;
