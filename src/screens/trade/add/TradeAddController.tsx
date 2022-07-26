import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import useLoading from 'hooks/useLoading';
import { UploadPhotoType } from 'types/api/common';
import uploadPhotos from 'api/common/uploadPhotos';
import { getTradePostsKey } from 'api/trade/getTradePosts';
import { LOADING_MUTATION } from 'pages/_app';
import postTradePost from 'api/trade/postTradePost';
import TradeAddView, { TradeAddViewProps } from './TradeAddView';

interface FormType {
  photos: UploadPhotoType[];
  title: string;
  content: string;
  goodsPrice: number;
  // tradeType: TradeType;
  chatRoomLink: string;
}

const TradeAddControllerController: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { startLoading } = useLoading();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>();

  const { append, fields, remove } = useFieldArray({ control, name: 'photos' });

  const { mutate: post } = useMutation(LOADING_MUTATION, postTradePost, {
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries(getTradePostsKey());
    },
  });

  const onDoneButtonClick = handleSubmit(({ photos, ...data }) => {
    if (!data.title || !data.content || !data.goodsPrice) {
      onOpen();
      return;
    }
    startLoading();
    uploadPhotos({ photos: fields }).then((ids) => {
      post({
        attachedFiles: ids.map((id) => ({
          fileId: id,
          willBeUploaded: true,
        })),
        ...data,
      });
    });
  });

  const viewProps: TradeAddViewProps = {
    onHeaderClick: () => router.push('/trade'),
    photoInputProps: {
      append,
      fields,
      remove,
    },
    onDoneButtonClick,
    register,
    isOpen,
    onClose,
    errors,
  };
  return <TradeAddView {...viewProps} />;
};

export default TradeAddControllerController;
