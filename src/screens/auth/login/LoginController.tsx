import { useCallback } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import LoginView from './LoginView';

import type { FC } from 'react';
import type { LoginViewProps } from './LoginView';

const LoginController: FC = () => {
  const onKakaoLoginClick = useCallback(() => {
    if (Kakao.isInitialized()) {
      Kakao.Auth.authorize({ redirectUri: `${process.env.NEXT_PUBLIC_WEB_HOST}/auth/kakao-login` });
    }
  }, []);

  const onLoadKakaoSdk = useCallback(() => {
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SDK_JS_KEY);
  }, []);

  const viewProps: LoginViewProps = {
    onKakaoLoginClick,
  };
  return (
    <>
      <Head>
        <title>로그인 - 꿀단지</title>
      </Head>
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={onLoadKakaoSdk}
      />
      <LoginView {...viewProps} />
    </>
  );
};

export default LoginController;
