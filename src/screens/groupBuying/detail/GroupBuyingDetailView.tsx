import GroupBuyingPost, { GroupBuyingPostProps } from 'components/groupBuying/GroupBuyingPost';
import Header from 'components/header';
import HeaderCenter from 'components/header/HeaderCenter';
import HeaderLeft from 'components/header/HeaderLeft';
import HeaderRight from 'components/header/HeaderRight';
import Layout from 'components/layout/Layout';
import type { FC } from 'react';

export interface GroupBuyingDetailViewProps {
  onBackClick: VoidFunction;
  groupBuyingPostProps?: GroupBuyingPostProps;
}

const GroupBuyingDetailView: FC<GroupBuyingDetailViewProps> = ({
  onBackClick,
  groupBuyingPostProps,
}) => (
  <Layout fullWidth>
    <Header>
      <HeaderLeft iconType="back" onClick={onBackClick} />
      <HeaderCenter title="공동구매" subtitle="인하대 헤리움 메트로 타워" />
      <HeaderRight iconType="ellipsis" onClick={() => {}} />
    </Header>
    {groupBuyingPostProps && <GroupBuyingPost {...groupBuyingPostProps} full />}
  </Layout>
);

export default GroupBuyingDetailView;
