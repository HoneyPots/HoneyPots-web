import KakaoLoginController from 'screens/auth/kakao-login/KakaoLoginController';

import type { GetServerSideProps, NextPage } from 'next';

export interface KakaoLoginPageProps {
  code: string;
}

const KakaoLogin: NextPage<KakaoLoginPageProps> = ({ code }) => (
  <KakaoLoginController code={code} />
);

export const getServerSideProps: GetServerSideProps<KakaoLoginPageProps> = async ({ query }) => {
  if (!query.code || typeof query.code !== 'string')
    return { redirect: { permanent: false, destination: '/auth/error' } };

  return { props: { code: query.code } };
};

export default KakaoLogin;
