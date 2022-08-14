import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { LOADING_MUTATION } from 'pages/_app';
import { GroupBuyingStatus } from 'types/api/group-buying';
import putGBPost from 'api/groupBuying/putGBPost';
import getGBPost, { getGBPostKey } from 'api/groupBuying/getGBPost';
import { getGBPostsKey } from 'api/groupBuying/getGBPosts';
import GroupBuyingEditView, { GBFormType, GroupBuyingEditViewProps } from './GroupBuyingEditView';
import type { FC } from 'react';

const GroupBuyingEditController: FC = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure({});

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<GBFormType>({});

  const { isSuccess } = useQuery(
    getGBPostKey({ postId: router.query.postId as string }),
    () => getGBPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
      onSuccess: (res) => {
        setValue('category', res.category);
        setValue('chatRoomLink', res.chatRoomLink);
        setValue('content', res.content);
        setValue('groupBuyingStatus', res.groupBuyingStatus);
        setValue('title', res.title);
      },
    },
  );

  const { mutate: put } = useMutation(LOADING_MUTATION, putGBPost, {
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries(getGBPostsKey());
    },
  });

  const onDoneButtonClick = handleSubmit(({ hour = 0, min = 0, ...data }) => {
    if (!data.category) {
      setError('category', { message: '카테고리를 선택해주세요', type: 'required' });
    }
    if (!data.title || !data.chatRoomLink || !data.category || (!hour && !min)) {
      onOpen();
      return;
    }

    const deadline = () => {
      if (hour && min) {
        return Math.floor(new Date().getTime() / 1000) + (Number(hour) * 60 + Number(min)) * 60;
      }

      if (!hour && min) {
        return Math.floor(new Date().getTime() / 1000) + Number(min) * 60;
      }

      if (hour && !min) {
        return Math.floor(new Date().getTime() / 1000) + Number(hour) * 60 * 60;
      }
      return 0;
    };

    put({
      body: {
        deadline: deadline(),
        ...data,
      },
      postId: router.query.postId as string,
    });
  });

  const viewProps: GroupBuyingEditViewProps = {
    onHeaderClick: router.back,
    isOpen,
    onClose,
    onCategoryChange: (e) => {
      setValue('category', e.currentTarget.value);
      clearErrors();
    },
    onDoneButtonClick,
    isSuccess,
    register,
    errors,
    groupBuyingStatusDefault: watch('groupBuyingStatus'),
    onStatusChange: (e) => {
      setValue('groupBuyingStatus', e.currentTarget.value as GroupBuyingStatus);
    },
    categoryDefault: watch('category'),
  };
  return <GroupBuyingEditView {...viewProps} />;
};

export default GroupBuyingEditController;
