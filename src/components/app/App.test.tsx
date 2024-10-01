// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "React App"', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: 'React App' });
  expect(headingElement).toBeInTheDocument();
});

test('renders "Edit src/components/app/App.tsx and save to reload."', () => {
  render(<App />);
  const pElement = screen.getByText((_, element) => {
    return element?.textContent === 'Edit src/components/app/App.tsx and save to reload.';
  });
  expect(pElement).toBeInTheDocument();
});

test('renders "Learn React" link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: 'Learn React' });
  expect(linkElement).toBeInTheDocument();
});
