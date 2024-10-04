import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailInput from './EmailInput';

interface IEmailInputProps {
  email: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddEmail: () => void;
  isEmailDuplicated: boolean;
  isEmailError: boolean;
}

describe('EmailInput Component', () => {
  // Mock functions for props
  const mockOnEmailChange = jest.fn();
  const mockOnAddEmail = jest.fn();

  // Utility function to render the component with default or custom props
  const renderComponent = (props: Partial<IEmailInputProps> = {}) => {
    const defaultProps: IEmailInputProps = {
      email: '',
      onEmailChange: mockOnEmailChange,
      onAddEmail: mockOnAddEmail,
      isEmailDuplicated: false,
      isEmailError: false,
    };

    return render(<EmailInput {...defaultProps} {...props} />);
  };

  // Reset mocks before each test to avoid interference
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input field with correct placeholder', () => {
    renderComponent();

    const inputElement = screen.getByPlaceholderText('example@email.com');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('renders the Add button', () => {
    renderComponent();

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('disables the Add button when email is duplicated', () => {
    renderComponent({ isEmailDuplicated: true, email: 'test@example.com' });

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
  });

  it('disables the Add button when there is an email error', () => {
    renderComponent({ isEmailError: true, email: 'invalid-email' });

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
  });

  it('disables the Add button when email input is empty', () => {
    renderComponent({ email: '' });

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
  });

  it('enables the Add button when email is valid and not duplicated or errored', () => {
    renderComponent({ email: 'test@example.com' });

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeEnabled();
  });

  it('calls onEmailChange when the input value changes', () => {
    renderComponent();

    const inputElement = screen.getByPlaceholderText('example@email.com');
    fireEvent.change(inputElement, { target: { value: 'some@email.com' } });

    expect(mockOnEmailChange).toHaveBeenCalledTimes(1);
    expect(mockOnEmailChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls onAddEmail when the Add button is clicked', async () => {
    renderComponent({ email: 'test@example.com' });

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(mockOnAddEmail).toHaveBeenCalledTimes(1);
  });

  it('does not call onAddEmail when the Add button is disabled and clicked', async () => {
    renderComponent({ isEmailDuplicated: true, email: 'test@example.com' });

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();

    fireEvent.click(addButton);

    expect(mockOnAddEmail).not.toHaveBeenCalled();
  });

  it('displays the duplicate email error message when isEmailDuplicated is true', () => {
    renderComponent({ isEmailDuplicated: true });

    const errorMessage = screen.getByText('The entered email already exists.');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error-message');
  });

  it('does not display the duplicate email error message when isEmailDuplicated is false', () => {
    renderComponent({ isEmailDuplicated: false });

    const errorMessage = screen.queryByText('The entered email already exists.');
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('matches the snapshot when rendered with default props', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when rendered with duplicated email', () => {
    const { asFragment } = renderComponent({ isEmailDuplicated: true, email: 'test@example.com' });
    expect(asFragment()).toMatchSnapshot();
  });
});
