import { FC, useCallback, useEffect, useState } from 'react';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import searchPosts, { searchPostsKey } from 'api/community/search/searchPosts';
import { Page, PostType } from 'types/api/common';
import { getPostsKey } from 'api/community/post/getPosts';
import delLike from 'api/community/reaction/delLike';
import postLike from 'api/community/reaction/postLike';
import SearchPostView from './SearchPostView';
import type { SearchPostViewProps } from './SearchPostView';

const SearchPostController: FC = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, fetchNextPage } = useInfiniteQuery(
    searchPostsKey('NORMAL', keyword),
    ({ pageParam }) =>
      searchPosts<PostType>({
        keyword: keyword as string,
        page: pageParam,
        postType: 'NORMAL',
        size: 20,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      getNextPageParam: (lastPage) => lastPage.pageable.pageNumber + 1,
      onSuccess(res) {
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
      enabled: Boolean(keyword),
    },
  );

  useEffect(() => {
    const queryKeyword = router.query.keyword;

    if (queryKeyword && typeof queryKeyword === 'string') {
      setKeyword(queryKeyword);
    } else {
      setKeyword(null);
    }
  }, [router]);

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

  const viewProps: SearchPostViewProps = {
    searchViewProps: {
      onBackClick: router.back,
      onSubmit: (e) => {
        e.preventDefault();
        setKeyword(e.currentTarget.keyword.value);
        router.push({
          pathname: router.pathname,
          query: {
            keyword: e.currentTarget.keyword.value,
          },
        });
      },
      placeholder: '게시글 검색',
    },
    posts:
      data && keyword ? ([] as PostType[]).concat(...data.pages.map((item) => item.content)) : [],
    each: (post) => ({
      onClick: () => router.push(`/post/${post.postId}`),
      full: false,
      onLikeClick: () => toggleLike(post),
      ...post,
    }),
    handleObserver,
  };
  return <SearchPostView {...viewProps} />;
};

export default SearchPostController;
