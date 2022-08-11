import { FC, useCallback, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import getPost, { getPostKey } from 'api/community/post/getPost';
import getComments, { getCommentsKey } from 'api/community/comment/getComments';
import { Comment, PostType } from 'types/api/common';
import postComment from 'api/community/comment/postComment';
import delLike from 'api/community/reaction/delLike';
import postLike from 'api/community/reaction/postLike';
import PostDetailView from './PostDetailView';
import type { PostDetailViewProps } from './PostDetailView';

const PostDetailControllerController: FC = () => {
  const router = useRouter();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();

  const { data, refetch: refetchPost } = useQuery(
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
      refetchPost();
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

  const deleteLike = useMutation(delLike);
  const addLike = useMutation(postLike);

  const toggleLike = (post: PostType) =>
    queryClient.setQueryData<PostType>(
      getPostKey({ postId: router.query.postId as string }),
      (oldData) => {
        if (oldData) {
          if (oldData.isLiked) {
            deleteLike.mutate({ reactionId: post.likeReactionId });
          } else {
            addLike.mutate({ targetId: post.postId, targetType: 'POST' });
          }

          const result: PostType = {
            ...oldData,
            isLiked: !oldData.isLiked,
            likeReactionCount: oldData.isLiked
              ? oldData.likeReactionCount - 1
              : oldData.likeReactionCount + 1,
          };

          return result;
        }
        return oldData;
      },
    );

  const viewProps: PostDetailViewProps = {
    post: data && {
      ...data,
      onLikeClick: () => toggleLike(data),
    },
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
    onHeaderClick: () => router.push('/'),
  };
  return <PostDetailView {...viewProps} />;
};

export default PostDetailControllerController;
