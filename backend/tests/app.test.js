// app.test.js
const request = require('supertest');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { infoLogger } = require("../helpers/logger.js");
const { rateLimiter } = require("../helpers/rate-limiter.js");
const xeroRoute = require('../routes/xero.js');

const createApp = () => {
  const app = express();

  // Middlewares
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

  return app;
};

describe('Express Application', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  test('should respond with 404 for non-existing routes', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Route not found');
  });

});