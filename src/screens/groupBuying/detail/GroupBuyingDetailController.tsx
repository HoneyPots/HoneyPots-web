import { useRouter } from 'next/router';

import { FC, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import getGBPost, { getGBPostKey } from 'api/groupBuying/getGBPost';
import useMe from 'hooks/useMe';
import { MenuItemType } from 'components/header/HeaderRight';
import GroupBuyingDetailView, { GroupBuyingDetailViewProps } from './GroupBuyingDetailView';

interface GroupBuyingDetailControllerControllerProps {
  examples?: any;
}

const GroupBuyingDetailControllerController: FC<
  GroupBuyingDetailControllerControllerProps
> = () => {
  const router = useRouter();
  const { isMe } = useMe();
  const { data } = useQuery(
    getGBPostKey({ postId: router.query.postId as string }),
    () => getGBPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const menuLists: MenuItemType[] = useMemo(() => {
    if (data) {
      if (isMe(data.writer.id)) {
        const result: MenuItemType[] = [
          { name: '수정', onClick: () => {} },
          { name: '삭제', onClick: () => {} },
        ];
        return result;
      }
      const result: MenuItemType[] = [{ name: '신고하기', onClick: () => {} }];
      return result;
    }
    const result: MenuItemType[] = [{ name: '신고하기', onClick: () => {} }];
    return result;
  }, [data, isMe]);

  const viewProps: GroupBuyingDetailViewProps = {
    onBackClick: router.back,
    groupBuyingPostProps: data,
    menuLists,
  };
  return <GroupBuyingDetailView {...viewProps} />;
};

export default GroupBuyingDetailControllerController;
