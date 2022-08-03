import PostDetailController from 'screens/home/detail/PostDetailController';
import { getButtomTabLayout } from 'components/navigation';

import { NextPageWithLayout } from 'types/nextjs';

const PostDetail: NextPageWithLayout = () => <PostDetailController />;

PostDetail.getLayout = getButtomTabLayout;

export default PostDetail;
