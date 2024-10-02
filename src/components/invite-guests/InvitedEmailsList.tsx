import EmailChip from './EmailChip';

interface IInvitedEmailsListProps {
  emails: Set<string>;
  onRemoveEmail: (email: string) => void;
}

const InvitedEmailsList = ({ emails, onRemoveEmail }: IInvitedEmailsListProps) => {
  return (
    <div className='invited-emails-list'>
      {Array.from(emails).map((email) => (
        <EmailChip key={email} email={email} onRemove={onRemoveEmail} />
      ))}
    </div>
  );
};

export default InvitedEmailsList;
