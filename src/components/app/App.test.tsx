// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "React App"', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: 'React App' });
  expect(headingElement).toBeInTheDocument();
});
