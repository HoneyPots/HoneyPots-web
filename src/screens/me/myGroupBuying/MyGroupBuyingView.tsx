import Header from 'components/header';
import Layout from 'components/layout/Layout';
import type { FC } from 'react';

export interface MyGroupBuyingViewProps {
  onHeaderClick: VoidFunction;
}

const MyGroupBuyingView: FC<MyGroupBuyingViewProps> = ({ onHeaderClick }) => (
  <Layout>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="나의 중고거래" />
    </Header>
  </Layout>
);

export default MyGroupBuyingView;