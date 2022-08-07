import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getPosts, { getPostsKey } from 'api/community/post/getPosts';
import { Page, PostType } from 'types/api/common';
import delLike from 'api/community/reaction/delLike';
import postLike from 'api/community/reaction/postLike';
import HomeView, { HomeViewProps } from './HomeView';

const HomeController: FC = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    getPostsKey(),
    ({ pageParam = 0 }) =>
      getPosts({ pageNumber: pageParam, pageSize: 10, sortField: 'createdAt', sortOption: 'desc' }),
    {
      getNextPageParam: (lastpage) => lastpage.pageable.pageNumber + 1,
      onSuccess(res) {
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
    },
  );

  const handleObserver = useCallback(() => {
    if (data && data.pages[data.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, data, fetchNextPage]);

  const deleteLike = useMutation(delLike);
  const addLike = useMutation(postLike);

  const toggleLike = (post: PostType) =>
    queryClient.setQueryData<InfiniteData<Page<PostType>>>(getPostsKey(), (oldData) => {
      if (oldData) {
        const result: InfiniteData<Page<PostType>> = {
          pageParams: [{}],
          pages: oldData.pages.map((page) => {
            const res: Page<PostType> = {
              ...page,
              content: page.content.map((c) => {
                if (c.postId === post.postId) {
                  let count = c.likeReactionCount;
                  if (c.isLiked) {
                    count -= 1;
                    deleteLike.mutate({ reactionId: post.likeReactionId });
                  } else {
                    count += 1;
                    addLike.mutate({ targetId: post.postId, targetType: 'POST' });
                  }

                  return {
                    ...c,
                    likeReactionCount: count,
                    isLiked: !c.isLiked,
                  };
                }
                return c;
              }),
            };
            return res;
          }),
        };
        return result;
      }

      return oldData;
    });

  const viewProps: HomeViewProps = {
    posts: data ? ([] as PostType[]).concat(...data.pages.map((item) => item.content)) : [],
    each: (post) => ({
      onClick: () => router.push(`/post/${post.postId}`),
      full: false,
      onLikeClick: () => toggleLike(post),
      ...post,
    }),
    handleObserver,
    onSearchClick: () => router.push('post/search'),
  };
  return <HomeView {...viewProps} />;
};

export default HomeController;
