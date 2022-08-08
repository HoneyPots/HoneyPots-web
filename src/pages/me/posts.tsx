import { getButtomTabLayout } from 'components/navigation';
import MyPostsController from 'screens/me/myPosts/MyPostsController';
import { NextPageWithLayout } from 'types/nextjs';

const MyPosts: NextPageWithLayout = () => <MyPostsController />;

MyPosts.getLayout = getButtomTabLayout;

export default MyPosts;
