import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { userActions } from 'libs/store/modules/user';
import login from 'api/auth/login';
import KakaoLoginView from './KakaoLoginView';
import type { FC } from 'react';
import type { KakaoLoginPageProps } from 'pages/auth/kakao-login';

const KakaoLoginController: FC<KakaoLoginPageProps> = ({ code }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_WEB_HOST}/api/auth/login`, {
    //     params: {
    //       authorizationCode: code,
    //     },
    //   })
    //   .then(console.log);
    login({ code }).then((res) => {
      dispatch(userActions.setToken(res.accessToken));
      router.replace('/');
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
