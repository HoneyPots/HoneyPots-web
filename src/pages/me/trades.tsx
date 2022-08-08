import { getButtomTabLayout } from 'components/navigation';
import MyTradesController from 'screens/me/myTrades/MyTradesController';
import { NextPageWithLayout } from 'types/nextjs';

const MyTrades: NextPageWithLayout = () => <MyTradesController />;

MyTrades.getLayout = getButtomTabLayout;

export default MyTrades;
