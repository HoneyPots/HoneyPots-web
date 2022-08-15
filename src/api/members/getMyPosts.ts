import axios from 'libs/axios';
import { GroupBuyingPostType } from 'types/api/group-buying';
import type { Page, PostType, UsedTradePost } from 'types/api/common';

interface GetMyPostsParameter {
  postType: 'NORMAL' | 'USED_TRADE' | 'GROUP_BUYING';
  page: number;
  size: number;
  sortField: 'createdAt'; // keyof Post
  sortOption: 'asc' | 'desc';
}

export const getMyPostsKey = (
  postType: 'NORMAL' | 'USED_TRADE' | 'GROUP_BUYING',
): [string, 'NORMAL' | 'USED_TRADE' | 'GROUP_BUYING'] => ['/api/members/posts', postType];

async function getMyPosts<T extends PostType | UsedTradePost | GroupBuyingPostType>({
  page,
  size,
  postType,
  sortField,
  sortOption,
}: GetMyPostsParameter) {
  const { data } = await axios.get<Page<T>>('/api/members/posts', {
    params: {
      page,
      size,
      sort: sortField.concat(',', sortOption),
      postType,
    },
  });

  return data;
}

export default getMyPosts;
