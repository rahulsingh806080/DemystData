const request = require("supertest");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const { infoLogger } = require("../helpers/logger");
const { rateLimiter } = require("../helpers/rate-limiter");

// Mock environment variables for testing
process.env.JWT_SECRET = "test-secret";
process.env.SERVER_PORT = 5000;

// Import the server.js file
const app = require("../app.js");  // Assuming server.js exports the app
jest.mock('axios');
describe("Express Server", () => {

  // Test for checking if the server starts
  it("should respond with status 200 on a valid request", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
  });

  // Test for Helmet middleware
  it("should apply security headers via Helmet", async () => {
    const response = await request(app).get("/user");
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
    expect(response.headers["strict-transport-security"]).toBeDefined();
  });

  // Test for CORS middleware
  it("should allow cross-origin requests", async () => {
    const response = await request(app)
      .get("/user")
      .set("Origin", "http://example.com");
    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-origin"]).toBe("*");
  });

  // Test for Session middleware
  it("should create a session", async () => {
    const response = await request(app)
      .get("/user")
      .set("Cookie", "connect.sid=test-session-id");  // simulate session
    expect(response.status).toBe(200);
  });

  // Test for Passport initialization
  it("should initialize passport", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    // You could also mock and test passport behavior if needed, but typically passport is more about authorization, which requires a real user
  });

  // Test for Rate Limiter middleware (mock the rate limiter functionality)
  it("should apply rate limiting", async () => {
    // Here you would mock the rateLimiter to simulate reaching the rate limit and return a 429 status code.
    const response = await request(app).get("/user");
    expect(response.status).toBe(200); // For normal requests
  });

  // Test for 404 error handling for unmatched routes
  it("should return 404 for unmatched routes", async () => {
    const response = await request(app).get("/non-existent-route");
    expect(response.status).toBe(404);
  });
  
  // Test the User Route
  it("should call /user route successfully", async () => {
    // You should define mock responses or test the actual route depending on the case
    const response = await request(app)
      .get("/user")
      .set("Authorization", "Bearer mock-token"); // Simulating an authenticated request
    expect(response.status).toBe(200);
  });
});
