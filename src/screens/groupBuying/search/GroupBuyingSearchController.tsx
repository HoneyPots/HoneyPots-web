import { useRouter } from 'next/router';
import GroupBuyingSearch, { GroupBuyingSearchProps } from './GroupBuyingSearchView';

import type { FC } from 'react';

const GroupBuyingSearchController: FC = () => {
  const router = useRouter();

  const viewProps: GroupBuyingSearchProps = {
    searchViewProps: {
      onChange: () => {},
      onBackClick: router.back,
      value: '미스터 피자',
    },
  };
  return <GroupBuyingSearch {...viewProps} />;
};

export default GroupBuyingSearchController;
