import { render, screen, fireEvent } from '@testing-library/react';
import InviteGuestsButton from './InviteGuestsButton';

describe('InviteGuestsButton Component', () => {
  // Mock functions for props
  const mockOnClick = jest.fn();

  const renderComponent = (disabled: boolean) => {
    render(<InviteGuestsButton disabled={disabled} onClick={mockOnClick} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    renderComponent(false);
    const buttonElement = screen.getByRole('button', { name: /invite user group/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('is enabled when disabled prop is false', () => {
    renderComponent(false);
    const buttonElement = screen.getByRole('button', { name: /invite user group/i });
    expect(buttonElement).toBeEnabled();
  });

  it('is disabled when disabled prop is true', () => {
    renderComponent(true);
    const buttonElement = screen.getByRole('button', { name: /invite user group/i });
    expect(buttonElement).toBeDisabled();
  });

  it('calls onClick when clicked and not disabled', () => {
    renderComponent(false);
    const buttonElement = screen.getByRole('button', { name: /invite user group/i });
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when clicked and disabled', () => {
    renderComponent(true);
    const buttonElement = screen.getByRole('button', { name: /invite user group/i });
    fireEvent.click(buttonElement);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
