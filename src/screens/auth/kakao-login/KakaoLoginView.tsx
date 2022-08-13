import Image from 'next/image';
import Layout from 'components/layout/Layout';
import logoimg from 'assets/images/logo.png';
import type { FC } from 'react';

// export interface KakaoLoginViewProps {}

const KakaoLoginView: FC = () => (
  <Layout>
    <Image priority src={logoimg} />
  </Layout>
);

export default KakaoLoginView;
