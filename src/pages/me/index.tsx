import { getButtomTabLayout } from 'components/navigation';
import MeController from 'screens/me/MeController';

import { NextPageWithLayout } from 'types/nextjs';

const Me: NextPageWithLayout = () => <MeController />;

Me.getLayout = getButtomTabLayout;

export default Me;
