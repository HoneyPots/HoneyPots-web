import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { LOADING_MUTATION } from 'pages/_app';
import { TradeStatus } from 'types/api/used-trades';
import getTradePost, { getTradePostKey } from 'api/trade/getTradePost';
import putTradePost from 'api/trade/putTradePost';
import TradeEditView, { TradeEditViewProps } from './TradeEditView';
import type { FC } from 'react';

interface FormType {
  title: string;
  content: string;
  goodsPrice: number;
  chatRoomLink: string;
  tradeStatus: TradeStatus;
}

const TradeEditController: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormType>();

  const { isSuccess } = useQuery(
    getTradePostKey({ postId: router.query.postId as string }),
    () => getTradePost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
      onSuccess: (res) => {
        setValue('chatRoomLink', res.chatRoomLink);
        setValue('content', res.content);
        setValue('goodsPrice', res.goodsPrice);
        setValue('title', res.title);
        setValue('tradeStatus', res.tradeStatus);
      },
    },
  );

  const { mutate: post } = useMutation(LOADING_MUTATION, putTradePost, {
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries(getTradePostKey({ postId: router.query.postId as string }));
    },
  });

  const onDoneButtonClick = handleSubmit(({ ...data }) => {
    if (!data.title || !data.content || !data.goodsPrice) {
      onOpen();
      return;
    }
    post({
      body: data,
      postId: router.query.postId as string,
    });
  });

  const viewProps: TradeEditViewProps = {
    isSuccess,
    onHeaderClick: () => router.back(),
    onTradeTypeChange: (e) => {
      setValue('tradeStatus', e.currentTarget.value as TradeStatus);
    },
    onDoneButtonClick,
    register,
    isOpen,
    onClose,
    errors,
    tradeStatusDefault: watch('tradeStatus'),
  };
  return <TradeEditView {...viewProps} />;
};

export default TradeEditController;
