import { useCallback } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useDispatch } from 'react-redux';
import { HeadersDefaults } from 'axios';
import { useRouter } from 'next/router';
import axios from 'libs/axios';
import { userActions } from 'libs/store/modules/user';
import login from 'api/auth/login';
import LoginView from './LoginView';
import type { FC } from 'react';
import type { LoginViewProps } from './LoginView';

const LoginController: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onKakaoLoginClick = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      login({ code: 'admin' }).then((res) => {
        dispatch(userActions.setToken(res.accessToken));
        dispatch(userActions.setUserId(res.memberId));
        axios.defaults.headers = {
          ...axios.defaults.headers,
          Authorization: `Bearer ${res.accessToken}`,
        } as HeadersDefaults;
        router.replace('/');
      });
    } else if (Kakao.isInitialized()) {
      Kakao.Auth.authorize({ redirectUri: `${process.env.NEXT_PUBLIC_WEB_HOST}/auth/kakao-login` });
    }
  }, [dispatch, router]);

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
