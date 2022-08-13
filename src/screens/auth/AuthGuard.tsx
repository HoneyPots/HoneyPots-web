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
    if (loading) {
      if (!accessToken) {
        const init = async () => {
          try {
            const { accessToken: newToken, memberId } = await postToken();
            dispatch(userActions.setToken(newToken));
            dispatch(userActions.setUserId(memberId));
            axios.defaults.headers = {
              ...axios.defaults.headers,
              Authorization: `Bearer ${newToken}`,
            } as HeadersDefaults;
            setLoading(false);
          } catch {
            router.replace('/auth/login');
          }
        };

        init();
      } else {
        setLoading(false);
      }
    }

    if (!loading && !accessToken && !router.pathname.startsWith('/auth')) {
      router.replace('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, router.pathname, loading, dispatch]);

  if (!loading || accessToken || router.pathname.startsWith('/auth')) return <div>{children}</div>;

  return <div>Loading</div>;
};

export default AuthGuard;
