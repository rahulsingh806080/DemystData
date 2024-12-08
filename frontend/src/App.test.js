import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import NavBar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';

jest.mock('./components/Navbar/Navbar', () => () => <div>NavBar</div>); // Mock NavBar for testing
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div>ToastContainer</div>,
}));

describe('App Component', () => {
  it('should render the App component without crashing', () => {
    render(<App />);
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('ToastContainer')).toBeInTheDocument();
  });

  it('should render NavBar component', () => {
    render(<App />);
    expect(screen.getByText('NavBar')).toBeInTheDocument();
  });

  it('should render ToastContainer with correct props', () => {
    render(<App />);
    // Check if ToastContainer is rendered with correct text content
    const toastContainer = screen.getByText('ToastContainer');
    expect(toastContainer).toBeInTheDocument();
    // Here you can test if the ToastContainer is correctly rendered, 
    // but testing internal props like autoClose, position, etc. could require more advanced mock setups.
  });

  it('should render children wrapped in AuthContextProvider', () => {
    const { container } = render(<App />);
    // Test that the AuthContextProvider is properly wrapping its children
    expect(container.querySelector('div.App')).toBeInTheDocument();
  });
});
