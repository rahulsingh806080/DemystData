import axiosDefault from "axios";

const isProduction = process.env.NODE_ENV === "production";

const baseURL = isProduction
  ? "https://<your-production-domain>/api"
  : "http://localhost:5000";

const defaultOptions = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axios = axiosDefault.create(defaultOptions);


export default axios;
