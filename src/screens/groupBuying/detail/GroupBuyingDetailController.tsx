import { useRouter } from 'next/router';

import { FC, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import getGBPost, { getGBPostKey } from 'api/groupBuying/getGBPost';
import GroupBuyingDetailView, { GroupBuyingDetailViewProps } from './GroupBuyingDetailView';

interface GroupBuyingDetailControllerControllerProps {
  examples?: any;
}

const GroupBuyingDetailControllerController: FC<
  GroupBuyingDetailControllerControllerProps
> = () => {
  const router = useRouter();
  const { data } = useQuery(
    getGBPostKey({ postId: router.query.postId as string }),
    () => getGBPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const viewProps: GroupBuyingDetailViewProps = {
    onBackClick: router.back,
    groupBuyingPostProps: data,
  };
  return <GroupBuyingDetailView {...viewProps} />;
};

export default GroupBuyingDetailControllerController;
