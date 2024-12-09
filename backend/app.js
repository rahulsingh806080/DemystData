require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV}`,
});

// Import dependencies
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const helmet = require('helmet');
const cors = require('cors');

//import helpers
const { infoLogger } = require("./helpers/logger");
const { rateLimiter } = require("./helpers/rate-limiter");

// imports routes
const xeroRoute = require('./routes/xero.js');


const app = express();

//middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(infoLogger);
app.use(rateLimiter);



app.use("/xero", xeroRoute);


// Error handling (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const port = process.env.SERVER_PORT || 5000;

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
