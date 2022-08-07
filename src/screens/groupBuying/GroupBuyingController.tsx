import { useRouter } from 'next/router';
import GroupBuyingControllerView from './GroupBuyingView';

import type { FC } from 'react';
import type { GroupBuyingViewProps } from './GroupBuyingView';

interface GroupBuyingControllerProps {
  examples?: any;
}

const GroupBuyingController: FC<GroupBuyingControllerProps> = () => {
  const router = useRouter();

  const viewProps: GroupBuyingViewProps = {
    onClick: () => router.push('group-buying/1'),
    onSearchClick: () => router.push('/group-buying/search'),
  };
  return <GroupBuyingControllerView {...viewProps} />;
};

export default GroupBuyingController;
