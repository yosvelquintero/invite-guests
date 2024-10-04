import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import withInviteGuestsLogic from './withInviteGuestsLogic'; // Adjust the path as needed
import '@testing-library/jest-dom/extend-expect';
import useEmailManagement from '../hooks/useEmailManagement';

// MockComponent that receives injected props from the HOC
const MockComponent: React.FC<ReturnType<typeof useEmailManagement>> = ({
  email,
  setEmail,
  invitedEmails,
  isEmailDuplicated,
  isEmailError,
  addEmail,
  removeEmail,
}) => (
  <div>
    <h1>Mock Component</h1>
    <input
      data-testid='email-input'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder='Enter email'
    />
    <button onClick={addEmail} disabled={!email || isEmailError || isEmailDuplicated}>
      Add Email
    </button>
    <ul data-testid='invited-emails-list'>
      {Array.from(invitedEmails).map((invitedEmail) => (
        <li key={invitedEmail}>
          {invitedEmail}
          <button onClick={() => removeEmail(invitedEmail)}>Remove</button>
        </li>
      ))}
    </ul>
    <div data-testid='is-email-duplicated'>{isEmailDuplicated.toString()}</div>
    <div data-testid='is-email-error'>{isEmailError.toString()}</div>
  </div>
);

// Wrap the MockComponent with the HOC
const WrappedMockComponent = withInviteGuestsLogic(MockComponent);

describe('withInviteGuestsLogic HOC', () => {
  it('injects hook props into the wrapped component with initial values', () => {
    render(<WrappedMockComponent />);

    // Verify initial email input value
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    expect(emailInput.value).toBe('');

    // Verify Add Email button is disabled initially
    const addEmailButton = screen.getByRole('button', { name: /add email/i });
    expect(addEmailButton).toBeDisabled();

    // Verify invited emails list is empty
    const invitedEmailsList = screen.getByTestId('invited-emails-list');
    expect(invitedEmailsList).toBeEmptyDOMElement();

    // Verify isEmailDuplicated and isEmailError flags
    const isEmailDuplicated = screen.getByTestId('is-email-duplicated');
    const isEmailError = screen.getByTestId('is-email-error');
    expect(isEmailDuplicated).toHaveTextContent('false');
    expect(isEmailError).toHaveTextContent('true'); // Based on hook's initial state
  });

  it('allows adding a valid email', () => {
    render(<WrappedMockComponent />);

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const addEmailButton = screen.getByRole('button', { name: /add email/i });

    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    expect(emailInput.value).toBe('user@example.com');

    // isEmailError should be false for valid email
    const isEmailError = screen.getByTestId('is-email-error');
    expect(isEmailError).toHaveTextContent('false');

    // Add Email button should be enabled
    expect(addEmailButton).not.toBeDisabled();

    // Click Add Email button
    fireEvent.click(addEmailButton);

    // Email input should be cleared
    expect(emailInput.value).toBe('');

    // Invited Emails list should have the new email
    const invitedEmailsList = screen.getByTestId('invited-emails-list');
    expect(invitedEmailsList).toHaveTextContent('user@example.com');

    // isEmailError should be true again because email is reset to ''
    expect(isEmailError).toHaveTextContent('true');

    // isEmailDuplicated should remain false
    const isEmailDuplicated = screen.getByTestId('is-email-duplicated');
    expect(isEmailDuplicated).toHaveTextContent('false');

    // Add Email button should be disabled again
    expect(addEmailButton).toBeDisabled();
  });

  it('prevents adding duplicate emails', () => {
    render(<WrappedMockComponent />);

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const addEmailButton = screen.getByRole('button', { name: /add email/i });

    // Add first email
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(addEmailButton);

    // Attempt to add the same email again
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

    // isEmailDuplicated should be true
    const isEmailDuplicated = screen.getByTestId('is-email-duplicated');
    expect(isEmailDuplicated).toHaveTextContent('true');

    // Add Email button should be disabled
    expect(addEmailButton).toBeDisabled();

    // Verify that the email is not added again
    const invitedEmailsList = screen.getByTestId('invited-emails-list');
    expect(invitedEmailsList).toHaveTextContent('user@example.com');
  });

  it('shows error for invalid email and prevents adding', () => {
    render(<WrappedMockComponent />);

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const addEmailButton = screen.getByRole('button', { name: /add email/i });

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    // isEmailError should be true
    const isEmailError = screen.getByTestId('is-email-error');
    expect(isEmailError).toHaveTextContent('true');

    // Add Email button should be disabled
    expect(addEmailButton).toBeDisabled();

    // Attempt to click Add Email button
    fireEvent.click(addEmailButton);

    // Invited Emails list should still be empty
    const invitedEmailsList = screen.getByTestId('invited-emails-list');
    expect(invitedEmailsList).toBeEmptyDOMElement();
  });

  it('allows removing an email', () => {
    render(<WrappedMockComponent />);

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const addEmailButton = screen.getByRole('button', { name: /add email/i });

    // Add an email
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(addEmailButton);

    // Verify email is added
    const invitedEmailsList = screen.getByTestId('invited-emails-list');
    expect(invitedEmailsList).toHaveTextContent('user@example.com');

    // Remove the email
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    // Invited Emails list should be empty again
    expect(invitedEmailsList).toBeEmptyDOMElement();

    // isEmailDuplicated and isEmailError should reflect the current state
    const isEmailDuplicated = screen.getByTestId('is-email-duplicated');
    const isEmailError = screen.getByTestId('is-email-error');
    expect(isEmailDuplicated).toHaveTextContent('false');
    expect(isEmailError).toHaveTextContent('true'); // Email input is empty
  });
});
