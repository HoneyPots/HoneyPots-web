import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import getPost, { getPostKey } from 'api/community/post/getPost';
import PostDetailView from './PostDetailView';
import type { FC } from 'react';
import type { PostDetailViewProps } from './PostDetailView';

interface PostDetailControllerControllerProps {
  examples?: any;
}

const PostDetailControllerController: FC<PostDetailControllerControllerProps> = () => {
  const router = useRouter();

  const { data } = useQuery(
    getPostKey({ postId: router.query.postId as string }),
    () => getPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const viewProps: PostDetailViewProps = {
    post: data,
  };
  return <PostDetailView {...viewProps} />;
};

export default PostDetailControllerController;
