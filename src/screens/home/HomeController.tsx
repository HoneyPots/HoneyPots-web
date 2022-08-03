import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getPosts, { getPostsKey } from 'api/community/post/getPosts';
import { PostType } from 'types/api/common';
import HomeView, { HomeViewProps } from './HomeView';

const HomeController: FC = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const router = useRouter();

  const { data, fetchNextPage } = useInfiniteQuery(
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

  const viewProps: HomeViewProps = {
    posts: data ? ([] as PostType[]).concat(...data.pages.map((item) => item.content)) : [],
    each: (post) => ({
      onClick: () => router.push(`/post/${post.postId}`),
      full: false,
      ...post,
    }),
    handleObserver,
  };
  return <HomeView {...viewProps} />;
};

export default HomeController;
