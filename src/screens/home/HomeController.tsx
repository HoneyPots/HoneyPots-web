import HomeView from './HomeView';
import type { FC } from 'react';

const HomeController: FC = () => {
  const viewProps = {};

  return <HomeView {...viewProps} />;
};

export default HomeController;
