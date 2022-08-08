import { useRouter } from 'next/router';
import TradeDetailView from './TradeDetailView';

import type { FC } from 'react';
import type { TradeDetailViewProps } from './TradeDetailView';

// interface TradeDetailControllerProps {
//   examples?: any;
// }

const TradeDetailController: FC = () => {
  const router = useRouter();

  const viewProps: TradeDetailViewProps = {
    onHeaderClick: router.back,
  };
  return <TradeDetailView {...viewProps} />;
};

export default TradeDetailController;
