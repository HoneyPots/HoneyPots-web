import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/community';
import HomeView from './HomeView';
import type { FC } from 'react';

const HomeController: FC = () => {
  const { data } = useQuery(['getPosts'], () =>
    getPosts({ pageNumber: 1, pageSize: 1, sortField: 'createdAt', sortOption: 'asc' }),
  );

  const viewProps = {};
  return <HomeView {...viewProps} />;
};

export default HomeController;
