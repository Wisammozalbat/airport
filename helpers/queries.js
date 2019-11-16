const PS = require("pg-promise").PreparedStatement;
let queries = {
  getUser: new PS({
    name: "get-user",
    text: "SELECT * FROM USERS WHERE USERNAME=$1"
  }),
  newUser: new PS({
    name: "new-user",
    text:
      "INSERT INTO USERS (username, type_user_id, password) VALUES ($1, $2, $3)"
  }),
  getFlights: new PS({
    name: "get-flight",
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
    text: ""
  })
};

module.exports = queries;
