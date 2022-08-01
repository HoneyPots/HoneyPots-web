import axios from 'api/axios';
import { GetPostsResponse } from './types';

export interface GetPostsRequest {
  sortField: 'createdAt';
  sortOption: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export default async function getPosts({
  sortOption,
  sortField,
  pageNumber,
  pageSize,
}: GetPostsRequest): Promise<GetPostsResponse> {
  const {
    data: { result: data },
  } = await axios.get(
    `/api/posts/normal?page=${pageNumber}&size=${pageSize}&sort=${sortField},${sortOption}`,
  );
  return data;
}
