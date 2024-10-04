import { render, screen, fireEvent } from '@testing-library/react';
import EmailChip from './EmailChip';

describe('EmailChip Component', () => {
  // Mock functions for props
  const mockOnRemove = jest.fn();

  const testEmail = 'test@example.com';

  // Reset mocks before each test to avoid interference
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the email correctly', () => {
    // Render the component with test props
    render(<EmailChip email={testEmail} onRemove={mockOnRemove} />);

    // Assert that the email text is displayed
    const emailElement = screen.getByText(testEmail);
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveClass('email-text');
  });

  it('renders the Remove button', () => {
    render(<EmailChip email={testEmail} onRemove={mockOnRemove} />);

    // Assert that the Remove button is present
    const buttonElement = screen.getByRole('button', { name: /remove/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onRemove with the correct email when Remove button is clicked', () => {
    render(<EmailChip email={testEmail} onRemove={mockOnRemove} />);

    const buttonElement = screen.getByRole('button', { name: /remove/i });

    // Simulate a click event on the Remove button
    fireEvent.click(buttonElement);

    // Assert that onRemove was called once with the correct email
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(testEmail);
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<EmailChip email={testEmail} onRemove={mockOnRemove} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
