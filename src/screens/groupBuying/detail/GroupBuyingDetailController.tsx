import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGBPostsKey } from 'api/groupBuying/getGBPosts';
import getGBPost, { getGBPostKey } from 'api/groupBuying/getGBPost';
import delGBPost from 'api/groupBuying/delGBPost';
import useMe from 'hooks/useMe';
import { MenuItemType } from 'components/header/HeaderRight';
import GroupBuyingDetailView, { GroupBuyingDetailViewProps } from './GroupBuyingDetailView';

const GroupBuyingDetailControllerController: FC = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isMe } = useMe();
  const { data } = useQuery(
    getGBPostKey({ postId: router.query.postId as string }),
    () => getGBPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const del = useMutation(delGBPost, {
    onSuccess: () => {
      router.push('/group-buying');
      queryClient.invalidateQueries(getGBPostsKey());
    },
  });

  const menuLists: MenuItemType[] = useMemo(() => {
    if (data) {
      if (isMe(data.writer.id)) {
        const result: MenuItemType[] = [
          { name: '수정', onClick: () => router.push(`/group-buying/edit/${router.query.postId}`) },
          { name: '삭제', onClick: () => onOpen() },
        ];
        return result;
      }
      const result: MenuItemType[] = [{ name: '신고하기', onClick: () => {} }];
      return result;
    }
    const result: MenuItemType[] = [{ name: '신고하기', onClick: () => {} }];
    return result;
  }, [data, isMe, onOpen, router]);

  const viewProps: GroupBuyingDetailViewProps = {
    onBackClick: router.back,
    groupBuyingPostProps: data,
    menuLists,
    alertProps: {
      isOpen,
      body: '삭제하시겠습니까?',
      header: '알림',
      onClose,
      buttonColor: '#EB3737',
      buttonText: '삭제',
      onButtonClick: () => del.mutate({ postId: router.query.postId as string }),
    },
  };
  return <GroupBuyingDetailView {...viewProps} />;
};

export default GroupBuyingDetailControllerController;
