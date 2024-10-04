import { render, screen, fireEvent, within } from '@testing-library/react';
import InvitedEmailsList from './InvitedEmailsList';

describe('InvitedEmailsList Component', () => {
  // Mock functions for props
  const mockOnRemoveEmail = jest.fn();

  const renderComponent = (emails: Set<string>) => {
    return render(<InvitedEmailsList emails={emails} onRemoveEmail={mockOnRemoveEmail} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the container with the correct class', () => {
    const { container } = renderComponent(new Set());
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('invited-emails-list');
  });

  it('renders the correct number of EmailChip components', () => {
    const emails = new Set(['user1@example.com', 'user2@example.com', 'user3@example.com']);
    renderComponent(emails);

    const removeButtons = screen.getAllByText(/Remove/i);
    expect(removeButtons).toHaveLength(emails.size);
  });

  it('displays each email correctly', () => {
    const emails = new Set(['user1@example.com', 'user2@example.com']);
    renderComponent(emails);

    emails.forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it('calls onRemoveEmail with the correct email when Remove button is clicked', () => {
    const emails = new Set(['user1@example.com', 'user2@example.com']);
    renderComponent(emails);

    emails.forEach((email) => {
      const emailElement = screen.getByText(email);
      // eslint-disable-next-line testing-library/no-node-access
      const emailChip = emailElement.closest('.email-chip');
      expect(emailChip).toBeInTheDocument();

      const removeButton = within(emailChip as HTMLElement).getByRole('button', { name: /remove/i });
      fireEvent.click(removeButton);

      expect(mockOnRemoveEmail).toHaveBeenCalledWith(email);
    });

    expect(mockOnRemoveEmail).toHaveBeenCalledTimes(emails.size);
  });
});
