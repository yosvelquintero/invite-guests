import React from 'react';
import useEmailManagement from '../hooks/useEmailManagement';

type TInjectedProps = ReturnType<typeof useEmailManagement>;
type TWithoutInjectedProps<P> = Omit<P, keyof TInjectedProps>;

const withInviteGuestsLogic = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<TWithoutInjectedProps<P>> => {
  const WrappedComponent = (props: TWithoutInjectedProps<P>) => {
    const emailManagement = useEmailManagement();
    return <Component {...(props as P)} {...emailManagement} />;
  };
  return WrappedComponent;
};

export default withInviteGuestsLogic;
