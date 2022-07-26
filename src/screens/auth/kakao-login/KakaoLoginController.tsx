import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import login from 'api/auth/login';
import KakaoLoginView from './KakaoLoginView';

import type { FC } from 'react';
import type { KakaoLoginPageProps } from 'pages/auth/kakao-login';

const KakaoLoginController: FC<KakaoLoginPageProps> = ({ code }) => {
  const router = useRouter();

  useEffect(() => {
    login({ code })
      .then((token) => {
        // set token
        router.replace('/');
      })
      .catch((error) => router.replace('/auth/error'));
  }, [router, code]);

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
