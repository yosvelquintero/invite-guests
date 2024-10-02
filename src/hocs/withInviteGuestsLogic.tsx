import React from 'react';
import useEmailManagement from '../hooks/useEmailManagement';

type InjectedProps = ReturnType<typeof useEmailManagement>;

const withInviteGuestsLogic = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof InjectedProps>> => {
  const WrappedComponent = (props: Omit<P, keyof InjectedProps>) => {
    const emailManagement = useEmailManagement();
    return <Component {...(props as P)} {...emailManagement} />;
  };
  return WrappedComponent;
};

export default withInviteGuestsLogic;
