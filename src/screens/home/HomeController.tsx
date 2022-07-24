import HomeView from './HomeView';
import type { FC } from 'react';
import type { HomeViewProps } from './HomeView';

interface HomeControllerProps {}

const HomeController: FC<HomeControllerProps> = () => {
  const viewProps: HomeViewProps = {};
  return <HomeView {...viewProps} />;
};

export default HomeController;
