
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import BalanceSheet from './components/BalanceSheet';
import axios from './api/axios';

jest.mock('./api/axios');
jest.mock('./components/BalanceSheet', () => jest.fn(() => <div>BalanceSheet Component</div>));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders balance sheet data successfully', async () => {
    const mockData = { someKey: 'someValue' };
    axios.get.mockResolvedValueOnce({ data: mockData });
    
    render(<App />);
    
    await waitFor(() => expect(BalanceSheet).toHaveBeenCalledWith({ data: mockData }, {}));
    expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
  });

  test('renders error message on API failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<App />);
 await screen.findByText(/Failed to fetch balance sheet. Please try again later./i);
  });

  test('does not render BalanceSheet component if API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<App />);
 await waitFor(() => expect(screen.queryByText('BalanceSheet Component')).not.toBeInTheDocument());
  });

  test('handles empty data response gracefully', async () => {
    const mockData = {};
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);
    
    await waitFor(() => expect(BalanceSheet).toHaveBeenCalledWith({ data: mockData }, {}));
  });
});
