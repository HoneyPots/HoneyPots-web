import { useRouter } from 'next/router';
import TradeAddView, { TradeAddViewProps } from './TradeAddView';
import type { FC } from 'react';

interface TradeAddControllerControllerProps {
  examples?: any;
}

const TradeAddControllerController: FC<TradeAddControllerControllerProps> = () => {
  const router = useRouter();

  const viewProps: TradeAddViewProps = {
    onHeaderClick: () => router.push('/trade'),
  };
  return <TradeAddView {...viewProps} />;
};

export default TradeAddControllerController;
