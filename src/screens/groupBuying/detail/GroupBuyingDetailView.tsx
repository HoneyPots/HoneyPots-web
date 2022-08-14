import Alert, { AlertProps } from 'components/chakra/Alert';
import GroupBuyingPost, { GroupBuyingPostProps } from 'components/groupBuying/GroupBuyingPost';
import Header from 'components/header';
import HeaderCenter from 'components/header/HeaderCenter';
import HeaderLeft from 'components/header/HeaderLeft';
import HeaderRight, { MenuItemType } from 'components/header/HeaderRight';
import Layout from 'components/layout/Layout';
import type { FC } from 'react';

export interface GroupBuyingDetailViewProps {
  onBackClick: VoidFunction;
  groupBuyingPostProps?: GroupBuyingPostProps;
  menuLists: MenuItemType[];
  alertProps: AlertProps;
}

const GroupBuyingDetailView: FC<GroupBuyingDetailViewProps> = ({
  onBackClick,
  groupBuyingPostProps,
  menuLists,
  alertProps,
}) => (
  <Layout fullWidth>
    <Header>
      <HeaderLeft iconType="back" onClick={onBackClick} />
      <HeaderCenter title="공동구매" subtitle="인하대 헤리움 메트로 타워" />
      <HeaderRight iconType="ellipsis" menuItemlist={menuLists} />
    </Header>
    {groupBuyingPostProps && <GroupBuyingPost {...groupBuyingPostProps} full />}
    <Alert {...alertProps} />
  </Layout>
);

export default GroupBuyingDetailView;
