const request = require("supertest");
const express = require("express");
jest.mock("axios");
const axios = require("axios");
const router = require("../routes/user.js"); // Path to your route file

// Mock the axios.get method to avoid making real HTTP requests


const app = express();
app.use("/", router); // Use the route in the app

describe("GET /", () => {
  
  // Test case: Success scenario for external API request
  it("should return the external API data", async () => {
    // Arrange: Mock the axios.get method to return a successful response
    const mockResponse = {
      data: {
        report: "BalanceSheet Report",
      },
    };
    axios.get.mockResolvedValue(mockResponse);  // Simulating a successful response

    // Act: Make the GET request
    const response = await request(app).get("/");

    // Assert: Check the response status and body
    expect(response.status).toBe(200); // Ensure status is 200
    expect(response.body).toEqual(mockResponse.data); // Ensure response matches the mocked data
    expect(axios.get).toHaveBeenCalledTimes(1);  // Ensure axios.get was called exactly once
  });

  // Test case: Failure scenario when the external API request fails
  it("should handle errors when the external API request fails", async () => {
    // Arrange: Mock the axios.get method to throw an error
    axios.get.mockRejectedValue(new Error("API request failed"));

    // Act: Make the GET request
    const response = await request(app).get("/");

    // Assert: Check the response status and error message
    expect(response.status).toBe(500); // Status should be 500 due to error
    expect(response.body.err).toBe("ggh");  // Error message from catch block
    expect(axios.get).toHaveBeenCalledTimes(1);  // Ensure axios.get was called exactly once
  });
});
