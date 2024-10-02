import React from 'react';

interface IEmailInputProps {
  email: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddEmail: () => void;
  isEmailDuplicated: boolean;
  isEmailError: boolean;
}

const EmailInput = ({ email, onEmailChange, onAddEmail, isEmailDuplicated, isEmailError }: IEmailInputProps) => {
  const isAddDisabled = isEmailDuplicated || isEmailError || !email;

  return (
    <div className='email-input-section'>
      <input type='email' value={email} onChange={onEmailChange} placeholder='example@email.com' />
      <button onClick={onAddEmail} disabled={isAddDisabled}>
        Add
      </button>
      {isEmailDuplicated && <p className='error-message'>The entered email already exists.</p>}
    </div>
  );
};

export default EmailInput;
