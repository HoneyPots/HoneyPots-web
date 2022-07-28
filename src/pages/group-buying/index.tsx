import GroupBuyingController from 'screens/groupBuying/GroupBuyingController';
import { NextPageWithLayout } from 'types/nextjs';
import { getButtomTabLayout } from 'components/navigation';

const GroupBuying: NextPageWithLayout = () => <GroupBuyingController />;

GroupBuying.getLayout = getButtomTabLayout;

export default GroupBuying;
