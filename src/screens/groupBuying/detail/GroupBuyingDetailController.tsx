import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import delPost from 'api/community/post/delPost';
import { AlertProps } from 'components/chakra/Alert';
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
  const { onClose, onOpen, isOpen } = useDisclosure();
  const router = useRouter();
  const { isMe } = useMe();
  const { data } = useQuery(
    getGBPostKey({ postId: router.query.postId as string }),
    () => getGBPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const [alertProps, setAlertProps] = useState<AlertProps>({
    body: '',
    header: '',
    isOpen,
    onClose,
  });

  const alertalert = useCallback(
    (props: Omit<AlertProps, 'isOpen' | 'onClose'>) => {
      setAlertProps((prev) => ({
        ...prev,
        ...props,
      }));
      onOpen();
    },
    [onOpen],
  );

  const del = useMutation(delPost, {
    onSuccess: () => {
      router.push('/');
    },
  });

  const menuLists: MenuItemType[] = useMemo(() => {
    if (data) {
      if (isMe(data.writer.id)) {
        const result: MenuItemType[] = [
          { name: '수정', onClick: () => router.push(`/post/edit/${router.query.postId}`) },
          {
            name: '삭제',
            onClick: () => {
              alertalert({
                body: '알림',
                header: '게시글을 삭제하시겠습니까?',
                buttonColor: '#EB3737',
                buttonText: '삭제',
                onButtonClick: () => del.mutate({ postId: router.query.postId as string }),
              });
            },
          },
        ];
        return result;
      }
      const result: MenuItemType[] = [
        {
          name: '신고하기',
          onClick: () => {},
        },
      ];
      return result;
    }
    const result: MenuItemType[] = [{ name: '신고하기', onClick: () => {} }];
    return result;
  }, [data, isMe, alertalert, del, router]);

  const viewProps: GroupBuyingDetailViewProps = {
    onBackClick: router.back,
    groupBuyingPostProps: data,
    menuLists,
    alertProps,
  };
  return <GroupBuyingDetailView {...viewProps} />;
};

export default GroupBuyingDetailControllerController;
