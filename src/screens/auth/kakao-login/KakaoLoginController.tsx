import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { HeadersDefaults } from 'axios';
import { userActions } from 'libs/store/modules/user';
import axios from 'libs/axios';
import login from 'api/auth/login';
import KakaoLoginView from './KakaoLoginView';
import type { FC } from 'react';
import type { KakaoLoginPageProps } from 'pages/auth/kakao-login';

const KakaoLoginController: FC<KakaoLoginPageProps> = ({ code }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    login({ code }).then((res) => {
      dispatch(userActions.setToken(res.accessToken));
      axios.defaults.headers = {
        ...axios.defaults.headers,
        Authorization: `Bearer ${res.accessToken}`,
      } as HeadersDefaults;
      if (res.isNewMember) {
        setTimeout(() => router.replace('/auth/create-account'), 1000);
      } else {
        setTimeout(() => router.replace('/'), 1000);
      }
    });
  }, [router, code, dispatch]);

  return (
    <>
      <Head>
        <title>카카오 로그인 중..</title>
      </Head>
      <KakaoLoginView />
    </>
  );
};

export default KakaoLoginController;
