import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SASE name', () => {
  render(<App />);
  const sase_name = screen.getByText(/University of Florida/i);
  expect(sase_name).toBeInTheDocument();
});
