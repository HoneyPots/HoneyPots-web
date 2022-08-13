import axios from 'libs/axios';
import { Page } from 'types/api/common';
import { GroupBuyingPostType } from 'types/api/group-buying';

interface GetGBPostsParams {
  sortField: 'createdAt';
  sortOption: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export const getGBPostsKey = () => ['/api/posts/group-buying'];

const getGBPosts = async ({ pageNumber, pageSize, sortField, sortOption }: GetGBPostsParams) => {
  const { data } = await axios.get<Page<GroupBuyingPostType>>('/api/posts/group-buying', {
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
};

export default getGBPosts;
