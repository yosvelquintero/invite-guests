interface IInviteGuestsButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const InviteGuestsButton = ({ disabled, onClick }: IInviteGuestsButtonProps) => {
  return (
    <div className='invite-user-group-button'>
      <button onClick={onClick} disabled={disabled}>
        Invite user group
      </button>
    </div>
  );
};

export default InviteGuestsButton;
