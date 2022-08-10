import axios from 'libs/axios';

import type { Page, PostType } from 'types/api/common';

interface GetPostsRequest {
  sortField: 'createdAt'; // keyof Post
  sortOption: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export const getPostsKey = () => ['/api/posts/normal'];

export default async function getPosts({
  sortOption,
  sortField,
  pageNumber,
  pageSize,
}: GetPostsRequest) {
  const { data } = await axios.get<Page<PostType>>('/api/posts/normal', {
    params: {
      page: pageNumber,
      size: pageSize,
      sort: sortField.concat(',', sortOption),
    },
    headers: {
      'Content-type': 'application/json',
    },
  });

  return data;
}
