import React from 'react';
import EmailInput from './EmailInput';
import InvitedEmailsList from './InvitedEmailsList';
import InviteGuestsButton from './InviteGuestsButton';
import withInviteGuestsLogic from '../../hocs/withInviteGuestsLogic';

import './InviteGuests.css';

interface IInviteGuestsProps {
  email: string;
  setEmail: (email: string) => void;
  invitedEmails: Set<string>;
  isEmailDuplicated: boolean;
  isEmailError: boolean;
  addEmail: () => void;
  removeEmail: (email: string) => void;
}

const InviteGuests = ({
  email,
  setEmail,
  invitedEmails,
  isEmailDuplicated,
  isEmailError,
  addEmail,
  removeEmail,
}: IInviteGuestsProps) => {
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAddEmail = () => {
    addEmail();
  };

  const handleRemoveEmail = (email: string) => {
    removeEmail(email);
  };

  const handleInviteGuests = () => {
    // Logic to send invitations
    console.log('Inviting guests:', Array.from(invitedEmails));
  };

  return (
    <div className='invite-guests-container'>
      <h2>Invite Guests to the Event</h2>
      <EmailInput
        email={email}
        onEmailChange={handleEmailChange}
        onAddEmail={handleAddEmail}
        isEmailDuplicated={isEmailDuplicated}
        isEmailError={isEmailError}
      />
      <InvitedEmailsList emails={invitedEmails} onRemoveEmail={handleRemoveEmail} />
      {invitedEmails.size > 0 && <InviteGuestsButton disabled={false} onClick={handleInviteGuests} />}
    </div>
  );
};

export default withInviteGuestsLogic(InviteGuests);
