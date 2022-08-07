import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { HeadersDefaults } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libs/store/modules';
import { userActions } from 'libs/store/modules/user';
import axios from 'libs/axios';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = useSelector<RootState, string>(({ user }) => user.accessToken);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      // refresh token => access token
      const getToken = () =>
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjU5NjE1ODg5LCJleHAiOjE2NTk3MDIyODl9.1HAH2sXJBEI1JXoC6Hv7a3_x2smxI27BHmPmzL0wzAq_QJjRb93IofxRc_hpqOkQMeE_zELSRKm6ZrvQs4I5aw';
      const newToken = getToken();
      dispatch(userActions.setToken(newToken));
      axios.defaults.headers = {
        ...axios.defaults.headers,
        Authorization: getToken,
      } as HeadersDefaults;
      setLoading(false);
    }

    if (!loading && !accessToken) {
      router.replace('/auth/login');
    }
  }, [accessToken, router, loading, dispatch]);

  if (!loading || accessToken || router.pathname.startsWith('/auth')) return <div>{children}</div>;

  return <div>Loading</div>;
};

export default AuthGuard;
