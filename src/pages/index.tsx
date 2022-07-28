import { getButtomTabLayout } from 'components/navigation';
import HomeController from 'screens/home/HomeController';

import { NextPageWithLayout } from 'types/nextjs';

const Home: NextPageWithLayout = () => <HomeController />;

Home.getLayout = getButtomTabLayout;

export default Home;
