import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import postGBPost from 'api/groupBuying/postGBPost';
import { getGBPostsKey } from 'api/groupBuying/getGBPosts';
import useLoading from 'hooks/useLoading';
import { LOADING_MUTATION } from 'pages/_app';
import uploadPhotos from 'api/common/uploadPhotos';
import GroupBuyingAddView, { GBFormType, GroupBuyingAddViewProps } from './GroupBuyingAddView';
import type { FC } from 'react';

const GroupBuyingAddController: FC = () => {
  const router = useRouter();
  const { startLoading } = useLoading();

  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure({});

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<GBFormType>({
    defaultValues: {
      category: '양식',
    },
  });

  const { append, fields, remove } = useFieldArray({ control, name: 'photos' });

  const { mutate: post } = useMutation(LOADING_MUTATION, postGBPost, {
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries(getGBPostsKey());
    },
  });

  const onDoneButtonClick = handleSubmit(({ photos, hour, min, ...data }) => {
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

    startLoading();
    uploadPhotos({ photos: fields }).then((ids) => {
      post({
        attachedFiles: ids.map((id) => ({
          fileId: id,
          willBeUploaded: true,
        })),
        deadline: deadline(),
        ...data,
      });
    });
  });

  const viewProps: GroupBuyingAddViewProps = {
    onHeaderClick: router.back,
    isOpen,
    onClose,
    onCategoryChange: (e) => {
      setValue('category', e.currentTarget.value);
      clearErrors();
    },
    onDoneButtonClick,
    photoInputProps: {
      append,
      fields,
      remove,
    },
    register,
    errors,
  };
  return <GroupBuyingAddView {...viewProps} />;
};

export default GroupBuyingAddController;
