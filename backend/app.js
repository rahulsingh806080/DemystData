require("dotenv").config({
  path: `./.env.${process.env.NODE_ENV}`,
});
// require("./config/db-connection");

const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const passport = require("passport");
const helmet = require("helmet");

const { infoLogger } = require("./helpers/logger");
const { rateLimiter } = require("./helpers/rate-limiter");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(infoLogger);
app.use(rateLimiter);

const xero_route = require("./routes/xero.js");

app.use("/xero", xero_route);

// default case for unmatched routes
app.use(function (req, res) {
  res.status(404);
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`\nServer Started on ${port}`);
});
