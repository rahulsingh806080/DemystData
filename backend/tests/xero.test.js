// tests/xero.test.js
const request = require("supertest");
const express = require("express");
const axios = require("axios");
const xeroRouter = require("../routes/xero"); // Adjust the path as necessary

jest.mock("axios"); // Mock Axios

const createApp = () => {
  const app = express();
  app.use("/xero", xeroRouter);
  return app;
};

describe("Xero Route", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("should return data from Xero API", async () => {
    const mockData = { data: "some data from Xero" }; // Mock response data
    axios.get.mockResolvedValueOnce({ data: mockData }); // Mocking the Axios get request
    const response = await request(app).get("/xero");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData); // Check if response body matches mock data
    expect(axios.get).toHaveBeenCalledTimes(1); // Ensure Axios was called once
  });


});