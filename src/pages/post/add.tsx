import { getButtomTabLayout } from 'components/navigation';
import PostAddController from 'screens/home/add/PostAddController';

import { NextPageWithLayout } from 'types/nextjs';

const PostAdd: NextPageWithLayout = () => <PostAddController />;

PostAdd.getLayout = getButtomTabLayout;

export default PostAdd;
