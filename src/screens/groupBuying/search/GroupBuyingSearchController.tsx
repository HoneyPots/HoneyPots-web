import { useRouter } from 'next/router';
import GroupBuyingSearch, { GroupBuyingSearchProps } from './GroupBuyingSearchView';

import type { FC } from 'react';

interface GroupBuyingSearchControllerProps {
  examples?: any;
}

const GroupBuyingSearchController: FC<GroupBuyingSearchControllerProps> = () => {
  const router = useRouter();

  const viewProps: GroupBuyingSearchProps = {
    searchViewProps: {
      onChange: () => {},
      onBackClick: router.back,
      value: '미스터 피자',
    },
    onClick: () => router.push('/group-buying/1'),
  };
  return <GroupBuyingSearch {...viewProps} />;
};

export default GroupBuyingSearchController;
