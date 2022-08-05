import { FC, useCallback } from 'react';
import TradeView from './TradeView';
import type { TradeViewProps } from './TradeView';

interface TradeControllerControllerProps {
  examples?: any;
}

const TradeControllerController: FC<TradeControllerControllerProps> = () => {
  const handleObserver = useCallback(() => {
    // if (data && data.pages[data.pages.length - 1]?.content) {
    //   if (isLastPage) {
    //     return;
    //   }
    //   fetchNextPage();
    // }
  }, []);

  const viewProps: TradeViewProps = {
    handleObserver,
  };
  return <TradeView {...viewProps} />;
};

export default TradeControllerController;
