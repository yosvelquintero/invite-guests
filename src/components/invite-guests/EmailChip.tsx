interface IEmailChipProps {
  email: string;
  onRemove: (email: string) => void;
}

const EmailChip = ({ email, onRemove }: IEmailChipProps) => {
  return (
    <div className='email-chip'>
      <span className='email-text'>{email}</span>
      <button onClick={() => onRemove(email)}>Remove</button>
    </div>
  );
};

export default EmailChip;
