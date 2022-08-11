import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadPhotoType } from 'types/api/common';
import uploadPhotos from 'api/common/uploadPhotos';
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
  tradeType: TradeType;
  chatRoomLink: string;
}

const TradeAddControllerController: FC<TradeAddControllerControllerProps> = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormType>();

  const { append, fields, remove } = useFieldArray({ control, name: 'photos' });

  const { mutate: post } = useMutation(postTradePost);

  const onDoneButtonClick = handleSubmit(({ photos, ...data }) => {
    uploadPhotos({ photos: fields }).then((ids) => {
      post({
        attachFiles: ids.map((id) => ({
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
  };
  return <TradeAddView {...viewProps} />;
};

export default TradeAddControllerController;
