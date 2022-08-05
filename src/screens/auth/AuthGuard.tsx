import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'libs/store';
import { UserState } from 'libs/store/modules/user';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken } = useSelector<ReduxState, UserState>(({ user }) => user);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (accessToken || router.pathname.startsWith('/auth')) return <div>{children}</div>;

  return <div />;
};

export default AuthGuard;
