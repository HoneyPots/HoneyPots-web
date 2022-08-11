import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { FC, useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadPhotoType } from 'types/api/common';
import uploadPhotos from 'api/common/uploadPhotos';
import { getTradePostsKey } from 'api/trade/getTradePosts';
import postTradePost, { PostTradePostParams } from 'api/trade/postTradePost';
import { TradeType } from 'types/api/used-trades';
import TradeAddView, { TradeAddViewProps } from './TradeAddView';

interface TradeAddControllerControllerProps {
  examples?: any;
}

interface FormType {
  photos: UploadPhotoType[];
  title: string;
  content: string;
  goodsPrice: number;
  // tradeType: TradeType;
  chatRoomLink: string;
}

const TradeAddControllerController: FC<TradeAddControllerControllerProps> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { control, handleSubmit, register, watch } = useForm<FormType>();

  const { append, fields, remove } = useFieldArray({ control, name: 'photos' });

  const { mutate: post } = useMutation(postTradePost, {
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries(getTradePostsKey());
    },
  });

  const onDoneButtonClick = handleSubmit(({ photos, ...data }) => {
    uploadPhotos({ photos: fields }).then((ids) => {
      post({
        ...(ids.length && {
          attachFiles: ids.map((id) => ({
            fileId: id,
            willBeUploaded: true,
          })),
        }),
        ...data,
      });
    });
  });

  const isButtonDisabled = !watch('title') || !watch('goodsPrice') || !watch('content');

  const viewProps: TradeAddViewProps = {
    onHeaderClick: () => router.push('/trade'),
    photoInputProps: {
      append,
      fields,
      remove,
    },
    onDoneButtonClick,
    register,
    isButtonDisabled,
  };
  return <TradeAddView {...viewProps} />;
};

export default TradeAddControllerController;
