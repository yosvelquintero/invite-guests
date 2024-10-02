import { useState, useEffect } from 'react';

const useEmailManagement = () => {
  const [email, setEmail] = useState('');
  const [invitedEmails, setInvitedEmails] = useState<Set<string>>(new Set());
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsEmailError(!isValidEmail(email));
    setIsEmailDuplicated(invitedEmails.has(email));
  }, [email, invitedEmails]);

  const addEmail = (): void => {
    if (email && !isEmailError && !isEmailDuplicated) {
      setInvitedEmails((prevEmails) => new Set(prevEmails).add(email));
      setEmail('');
    }
  };

  const removeEmail = (emailToRemove: string): void => {
    setInvitedEmails((prevEmails) => {
      const newEmails = new Set(prevEmails);
      newEmails.delete(emailToRemove);
      return newEmails;
    });
  };

  return {
    email,
    setEmail,
    invitedEmails,
    isEmailDuplicated,
    isEmailError,
    addEmail,
    removeEmail,
  };
};

export default useEmailManagement;
