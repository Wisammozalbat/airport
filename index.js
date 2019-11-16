const express = require("express");
// let session = require("express-session");
const app = express();
const jwt = require("express-jwt");
const config = require("./helpers/config");
const morgan = require("morgan");
let passport = require("passport");
let strategies = require("./helpers/strategies");
let auth = require("./middlewares/isAuth");

app.use(morgan("dev"));
app.use("/views", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  jwt({
    secret: config.secret
  }).unless({
    path: ["/login", "/signup", "/", "/flights", "/flights/:id"]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./controllers"));
app.get("/", function(req, res) {
  res.redirect("views/index.html");
});
app.use(auth.isValidToken);
passport.use(strategies.localStrategy);
passport.use(strategies.jwtStrategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.listen(config.port, function() {
  console.log("Server listening on port", config.port);
});
