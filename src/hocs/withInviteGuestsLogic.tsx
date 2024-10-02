import React from 'react';
import useEmailManagement from '../hooks/useEmailManagement';

type TInjectedProps = ReturnType<typeof useEmailManagement>;

const withInviteGuestsLogic = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TInjectedProps>> => {
  const WrappedComponent = (props: Omit<P, keyof TInjectedProps>) => {
    const emailManagement = useEmailManagement();
    return <Component {...(props as P)} {...emailManagement} />;
  };
  return WrappedComponent;
};

export default withInviteGuestsLogic;
