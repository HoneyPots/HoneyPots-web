import { getButtomTabLayout } from 'components/navigation';
import MyGroupBuyingController from 'screens/me/myGroupBuying/MyGroupBuyingController';
import { NextPageWithLayout } from 'types/nextjs';

const MyGroupBuying: NextPageWithLayout = () => <MyGroupBuyingController />;

MyGroupBuying.getLayout = getButtomTabLayout;

export default MyGroupBuying;
