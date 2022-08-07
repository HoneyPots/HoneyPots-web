import { useRouter } from 'next/router';
import GroupBuyingAddView from './GroupBuyingAddView';

import type { FC } from 'react';
import type { GroupBuyingAddViewProps } from './GroupBuyingAddView';

interface GroupBuyingAddControllerProps {
  examples?: any;
}

const GroupBuyingAddController: FC<GroupBuyingAddControllerProps> = () => {
  const router = useRouter();
  const viewProps: GroupBuyingAddViewProps = {
    onHeaderClick: router.back,
  };
  return <GroupBuyingAddView {...viewProps} />;
};

export default GroupBuyingAddController;
