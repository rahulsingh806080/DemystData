// axiosConfig.test.js
import axios from './axios.js'; // Adjust the import path as necessary

describe('Axios Configuration', () => {
  let originalEnv;

  beforeAll(() => {
    // Save the original NODE_ENV value
    originalEnv = process.env.NODE_ENV;
  });

  afterAll(() => {
    // Restore the original NODE_ENV value
    process.env.NODE_ENV = originalEnv;
  });

  test('should create axios instance with development baseURL', () => {
    // Set environment to development
    process.env.NODE_ENV = 'development';

    const expectedBaseURL = 'http://localhost:5000';
    const axiosInstance = axios;

    expect(axiosInstance.defaults.baseURL).toBe(expectedBaseURL);
    expect(axiosInstance.defaults.headers['Content-Type']).toBe('application/json');
  });

  test('should always have Content-Type as application/json in headers', () => {
    const axiosInstance = axios;

    expect(axiosInstance.defaults.headers['Content-Type']).toBe('application/json');
  });
});