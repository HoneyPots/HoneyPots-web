import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import TradeView from './TradeView';
import type { TradeViewProps } from './TradeView';

interface TradeControllerControllerProps {
  examples?: any;
}

const TradeControllerController: FC<TradeControllerControllerProps> = () => {
  const router = useRouter();
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
    onSearchClick: () => router.push('/trade/search'),
  };
  return <TradeView {...viewProps} />;
};

export default TradeControllerController;
