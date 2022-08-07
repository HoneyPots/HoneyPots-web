import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { HeadersDefaults } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libs/store/modules';
import { userActions } from 'libs/store/modules/user';
import axios from 'libs/axios';
import postToken from 'api/auth/token';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = useSelector<RootState, string>(({ user }) => user.accessToken);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(accessToken, loading);
    if (loading) {
      // refresh token => access token
      postToken().then(({ accessToken: newToken }) => {
        dispatch(userActions.setToken(newToken));
        axios.defaults.headers = {
          ...axios.defaults.headers,
          Authorization: newToken,
        } as HeadersDefaults;
        setLoading(false);
      });
    }

    if (!loading && !accessToken) {
      router.replace('/auth/login');
    }
  }, [accessToken, router, loading, dispatch]);

  if (!loading || accessToken || router.pathname.startsWith('/auth')) return <div>{children}</div>;

  return <div>Loading</div>;
};

export default AuthGuard;
