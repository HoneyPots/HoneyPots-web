import axios from 'libs/axios';
import { Page, UsedTradePost } from 'types/api/common';

interface GetTradePostsParams {
  sortField: 'createdAt'; // keyof Post
  sortOption: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export const getTradePostsKey = () => ['/api/posts/used-trades'];

async function getTradePosts({ pageNumber, pageSize, sortField, sortOption }: GetTradePostsParams) {
  const { data } = await axios.get<Page<UsedTradePost>>('/api/posts/used-trades', {
    params: {
      page: pageNumber,
      size: pageSize,
      sort: `${sortField},${sortOption}`,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
  return data;
}

export default getTradePosts;
