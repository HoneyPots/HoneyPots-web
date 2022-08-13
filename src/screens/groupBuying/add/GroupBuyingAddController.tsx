import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import postGBPost from 'api/groupBuying/postGBPost';
import { getGBPostsKey } from 'api/groupBuying/getGBPosts';
import uploadPhotos from 'api/common/uploadPhotos';
import GroupBuyingAddView, { GBFormType, GroupBuyingAddViewProps } from './GroupBuyingAddView';
import type { FC } from 'react';

interface GroupBuyingAddControllerProps {
  examples?: any;
}

const GroupBuyingAddController: FC<GroupBuyingAddControllerProps> = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { control, handleSubmit, register, setValue } = useForm<GBFormType>();

  const { append, fields, remove } = useFieldArray({ control, name: 'photos' });

  const { mutate: post } = useMutation(postGBPost, {
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries(getGBPostsKey());
    },
  });

  const onDoneButtonClick = handleSubmit(({ photos, hour, min, ...data }) => {
    if (!data.title || !data.content || !data.chatRoomLink || !data.category || !hour || !min) {
      onOpen();
      return;
    }

    uploadPhotos({ photos: fields }).then((ids) => {
      post({
        attachedFiles: ids.map((id) => ({
          fileId: id,
          willBeUploaded: true,
        })),
        deadLine: (hour * 60 + min) * 60,
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
    },
    onDoneButtonClick,
    photoInputProps: {
      append,
      fields,
      remove,
    },
    register,
  };
  return <GroupBuyingAddView {...viewProps} />;
};

export default GroupBuyingAddController;
