import Link from 'next/link';
import Header from 'components/header';
import HeaderCenter from 'components/header/HeaderCenter';
import Layout from 'components/layout/Layout';
import MeComponents from './components';
import type { FC } from 'react';

export interface MeViewProps {
  examples?: any;
}

const MeView: FC<MeViewProps> = () => (
  <Layout>
    <Header>
      <HeaderCenter title="내정보" />
    </Header>
    <MeComponents.Title>계정</MeComponents.Title>
    <Link href="/auth/create-account">
      <MeComponents.SubTitle>닉네임 변경</MeComponents.SubTitle>
    </Link>
    <MeComponents.SubTitle>계정 삭제</MeComponents.SubTitle>
    <MeComponents.Title>나의 활동</MeComponents.Title>
    <MeComponents.SubTitle>내가 작성한 게시글</MeComponents.SubTitle>
    <MeComponents.SubTitle>내가 작성한 중고거래</MeComponents.SubTitle>
    <MeComponents.SubTitle>내가 작성한 공동구매</MeComponents.SubTitle>
  </Layout>
);

export default MeView;
