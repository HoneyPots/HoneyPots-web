import { FC, useCallback, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import getPost, { getPostKey } from 'api/community/post/getPost';
import getComments, { getCommentsKey } from 'api/community/post/comment/getComments';
import { Comment } from 'types/api/common';
import postComment from 'api/community/post/comment/postComment';
import PostDetailView from './PostDetailView';
import type { PostDetailViewProps } from './PostDetailView';

interface PostDetailControllerControllerProps {
  examples?: any;
}

const PostDetailControllerController: FC<PostDetailControllerControllerProps> = () => {
  const router = useRouter();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [totalComments, setTotalComments] = useState<number>(0);

  const { data } = useQuery(
    getPostKey({ postId: router.query.postId as string }),
    () => getPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const {
    data: comments,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    getCommentsKey(router.query.postId as string),
    ({ pageParam }) =>
      getComments({
        pageNumber: pageParam,
        pageSize: 20,
        postId: router.query.postId as string,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      enabled: Boolean(router.query.postId),
      getNextPageParam: (lastPage) => lastPage.pageable.pageNumber + 1,
      onSuccess(res) {
        setTotalComments(res.pages[0].totalElements);
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
    },
  );

  const leaveComment = useMutation(postComment, {
    onMutate: () => {
      setComment('');
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleObserver = useCallback(() => {
    if (comments && comments.pages[comments.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, comments, fetchNextPage]);

  const viewProps: PostDetailViewProps = {
    post: data,
    comments: comments
      ? ([] as Comment[]).concat(...comments.pages.map((item) => item.content))
      : [],
    handleObserver,
    commentInputProps: {
      onChange: (e) => setComment(e.currentTarget.value),
      onSubmitClick: () => {
        leaveComment.mutate({
          content: comment,
          postId: router.query.postId as string,
        });
      },
      value: comment,
    },
    totalComments,
    onHeaderClick: () => router.push('/'),
  };
  return <PostDetailView {...viewProps} />;
};

export default PostDetailControllerController;
