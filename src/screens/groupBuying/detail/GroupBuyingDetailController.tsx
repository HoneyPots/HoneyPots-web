import { useRouter } from 'next/router';
import GroupBuyingDetailView from './GroupBuyingDetailView';

import type { FC } from 'react';
import type { GroupBuyingDetailViewProps } from './GroupBuyingDetailView';

interface GroupBuyingDetailControllerControllerProps {
  examples?: any;
}

const GroupBuyingDetailControllerController: FC<
  GroupBuyingDetailControllerControllerProps
> = () => {
  const router = useRouter();
  const viewProps: GroupBuyingDetailViewProps = {
    onBackClick: router.back,
  };
  return <GroupBuyingDetailView {...viewProps} />;
};

export default GroupBuyingDetailControllerController;
