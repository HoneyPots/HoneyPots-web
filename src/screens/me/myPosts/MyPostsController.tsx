import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getMyPosts, { getMyPostsKey } from 'api/members/getMyPosts';
import delLike from 'api/community/reaction/delLike';
import postLike from 'api/community/reaction/postLike';
import MyPostsView from './MyPostsView';
import type { MyPostsViewProps } from './MyPostsView';
import type { Page, PostType } from 'types/api/common';

const MyPostsController: FC = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, fetchNextPage } = useInfiniteQuery(
    getMyPostsKey('NORMAL'),
    ({ pageParam, queryKey: [, postType] }) =>
      getMyPosts({
        page: pageParam,
        size: 10,
        postType,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      getNextPageParam: (lastPage) => lastPage.pageable.pageNumber + 1,
      onSuccess: (res) => {
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
    },
  );

  const deleteLike = useMutation(delLike);
  const addLike = useMutation(postLike);

  const handleObserver = useCallback(() => {
    if (data && data.pages[data.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, data, fetchNextPage]);

  const toggleLike = (post: PostType) =>
    queryClient.setQueryData<InfiniteData<Page<PostType>>>(getMyPostsKey('NORMAL'), (oldData) => {
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

  const viewProps: MyPostsViewProps = {
    onHeaderClick: router.back,
    each: (item) => ({
      ...item,
      full: false,
      onClick: () => router.push(`/post/${item.postId}`),
      onLikeClick: () => toggleLike(item),
    }),
    handleObserver,
    posts: data
      ? ([] as PostType[]).concat(...data.pages.map((item) => item.content as PostType[]))
      : [],
  };
  return <MyPostsView {...viewProps} />;
};

export default MyPostsController;
