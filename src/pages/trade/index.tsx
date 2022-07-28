import { getButtomTabLayout } from 'components/navigation';
import TradeController from 'screens/trade/TradeController';

import { NextPageWithLayout } from 'types/nextjs';

const Trade: NextPageWithLayout = () => <TradeController />;

Trade.getLayout = getButtomTabLayout;

export default Trade;
