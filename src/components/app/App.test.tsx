import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the header', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { name: 'React App' });
    expect(headerElement).toBeInTheDocument();
  });
});
