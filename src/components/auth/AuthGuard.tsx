import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { HeadersDefaults } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libs/store/modules';
import { userActions } from 'libs/store/modules/user';
import axios from 'libs/axios';
import postToken from 'api/auth/token';
import Layout from 'components/layout/Layout';
import logoimg from 'assets/images/logo.png';
import Loading from 'components/loading/Loading';

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
            setTimeout(() => setLoading(false), 1000);
          } catch {
            setTimeout(() => setLoading(false), 1000);
            router.replace('/auth/login');
          }
        };

        init();
      } else {
        setTimeout(() => setLoading(false), 1000);
      }
    }

    if (!loading && !accessToken && !router.pathname.startsWith('/auth')) {
      router.replace('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, router.pathname, loading, dispatch]);

  if (loading) return <Loading />;

  if (!loading || accessToken || router.pathname.startsWith('/auth')) return <div>{children}</div>;

  return (
    <Layout>
      <Image priority src={logoimg} />
    </Layout>
  );
};

export default AuthGuard;
