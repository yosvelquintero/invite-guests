import { render, screen, fireEvent } from '@testing-library/react';
import InviteGuests from './InviteGuests';

describe('InviteGuests Component', () => {
  const renderComponent = () => {
    return render(<InviteGuests />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    renderComponent();
    expect(screen.getByText('Invite Guests to the Event')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example@email\.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('updates email input when typing', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    expect(inputElement.value).toBe('test@example.com');
  });

  it('adds email to invited emails list when clicking Add button', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Enter a valid email
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    fireEvent.click(addButton);

    // Verify the email is added to the list
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Verify the input is cleared
    expect((inputElement as HTMLInputElement).value).toBe('');
  });

  it('disables the Add button when email is duplicated', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add the first email
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    fireEvent.click(addButton);

    // Attempt to add the same email again
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    expect(addButton).toBeDisabled();
  });

  it('disables the Add button when there is an email error', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Enter an invalid email
    fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
    expect(addButton).toBeDisabled();

    // Optionally, verify that an error message is displayed (if implemented)
    // expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('disables the Add button when email input is empty', () => {
    renderComponent();
    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
  });

  it('renders InvitedEmailsList with invited emails', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add multiple emails
    const emails = ['user1@example.com', 'user2@example.com'];
    emails.forEach((email) => {
      fireEvent.change(inputElement, { target: { value: email } });
      fireEvent.click(addButton);
    });

    // Verify each email is rendered in the list
    emails.forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it('removes an email when Remove button is clicked', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add an email
    fireEvent.change(inputElement, { target: { value: 'user1@example.com' } });
    fireEvent.click(addButton);

    // Verify the email is added
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();

    // Click the Remove button
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    // Verify the email is removed
    expect(screen.queryByText('user1@example.com')).not.toBeInTheDocument();
  });

  it('renders InviteGuestsButton when there are invited emails', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add an email to invite
    fireEvent.change(inputElement, { target: { value: 'user1@example.com' } });
    fireEvent.click(addButton);

    // Verify InviteGuestsButton is rendered and enabled
    const inviteButton = screen.getByRole('button', { name: /invite user group/i });
    expect(inviteButton).toBeInTheDocument();
    expect(inviteButton).not.toBeDisabled();
  });

  it('does not render InviteGuestsButton when there are no invited emails', () => {
    renderComponent();
    const inviteButton = screen.queryByRole('button', { name: /invite user group/i });
    expect(inviteButton).not.toBeInTheDocument();
  });

  it('calls handleInviteGuests when InviteGuestsButton is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/example@email\.com/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add an email to invite
    fireEvent.change(inputElement, { target: { value: 'user1@example.com' } });
    fireEvent.click(addButton);

    // Click the InviteGuestsButton
    const inviteButton = screen.getByRole('button', { name: /invite user group/i });
    fireEvent.click(inviteButton);

    // Verify the console.log was called with the correct arguments
    expect(consoleSpy).toHaveBeenCalledWith('Inviting guests:', ['user1@example.com']);
    consoleSpy.mockRestore();
  });
});
