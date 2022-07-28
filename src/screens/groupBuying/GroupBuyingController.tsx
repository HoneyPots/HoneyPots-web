import GroupBuyingControllerView from './GroupBuyingView';

import type { FC } from 'react';
import type { GroupBuyingViewProps } from './GroupBuyingView';

interface GroupBuyingControllerControllerProps {
  examples?: any;
}

const GroupBuyingControllerController: FC<GroupBuyingControllerControllerProps> = () => {
  const viewProps: GroupBuyingViewProps = {};
  return <GroupBuyingControllerView {...viewProps} />;
};

export default GroupBuyingControllerController;
