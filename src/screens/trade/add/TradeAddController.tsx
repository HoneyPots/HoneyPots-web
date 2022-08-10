import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { Photo } from 'types/api/common';
import { PostTradePostParams } from 'api/trade/postTradePost';
import { TradeStatus } from 'types/api/used-trades';
import TradeAddView, { TradeAddViewProps } from './TradeAddView';

interface TradeAddControllerControllerProps {
  examples?: any;
}

const TradeAddControllerController: FC<TradeAddControllerControllerProps> = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<PostTradePostParams>();

  const { append, fields, remove } = useFieldArray({ control, name: 'attachFiles' });

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const viewProps: TradeAddViewProps = {
    onHeaderClick: () => router.push('/trade'),
    photoInputProps: {
      append,
      fields,
      remove,
    },
  };
  return <TradeAddView {...viewProps} />;
};

export default TradeAddControllerController;
