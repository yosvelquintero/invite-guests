// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "React App"', () => {
  render(<App />);
  const h1Element = screen.getByText((_, element) => {
    return element?.textContent === 'React App';
  });
  expect(h1Element).toBeInTheDocument();
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
  const linkElement = screen.getByText((_, element) => {
    return element?.textContent === 'Learn React';
  });
  expect(linkElement).toBeInTheDocument();
});
