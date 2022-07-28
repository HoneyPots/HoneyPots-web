import TradeView from './TradeView';

import type { FC } from 'react';
import type { TradeViewProps } from './TradeView';

interface TradeControllerControllerProps {
  examples?: any;
}

const TradeControllerController: FC<TradeControllerControllerProps> = () => {
  const viewProps: TradeViewProps = {};
  return <TradeView {...viewProps} />;
};

export default TradeControllerController;
