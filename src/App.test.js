import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const sase_name = screen.getByText(/UF SASE/i);
  expect(sase_name).toBeInTheDocument();
});
