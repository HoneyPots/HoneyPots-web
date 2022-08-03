import axios from 'libs/axios';

import type { Comment, Page } from 'types/api/common';

interface GetCommentsParams {
  sortField: 'createdAt'; // keyof Post
  sortOption: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
  postId: string;
}

export const getCommentsKey = (postId: string) => ['/api/comments', postId];

export default async function getComments({
  sortOption,
  sortField,
  pageNumber,
  pageSize,
  postId,
}: GetCommentsParams) {
  const { data } = await axios.get<Page<Comment>>('/api/comments', {
    params: {
      page: pageNumber,
      size: pageSize,
      sort: sortField.concat(',', sortOption),
      postId,
    },
  });

  return data;
}
