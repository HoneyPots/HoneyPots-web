import { useRouter } from 'next/router';
import MyPostsView from './MyPostsView';
import type { FC } from 'react';
import type { MyPostsViewProps } from './MyPostsView';

interface MyPostsControllerProps {
  examples?: any;
}

const MyPostsController: FC<MyPostsControllerProps> = () => {
  const router = useRouter();

  const viewProps: MyPostsViewProps = {
    onHeaderClick: router.back,
    each: (item) => item,
    handleObserver: () => {},
    posts: [],
  };
  return <MyPostsView {...viewProps} />;
};

export default MyPostsController;
