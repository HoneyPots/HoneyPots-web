import axios from 'libs/axios';
import { Page, PostEnum, PostType, UsedTradePost } from 'types/api/common';
import { GroupBuyingPostType } from 'types/api/group-buying';

interface SearchPostsParams {
  keyword: string;
  postType: PostEnum;
  page: number;
  size: number;
  sortField: 'createdAt'; // keyof Post
  sortOption: 'asc' | 'desc';
}

type ALLPost = PostType | UsedTradePost | GroupBuyingPostType;

export const searchPostsKey = (type: PostEnum, keyword: string) => ['/api/posts', type, keyword];

async function searchPosts<T extends ALLPost>({
  keyword,
  page,
  postType,
  size,
  sortField,
  sortOption,
}: SearchPostsParams) {
  const { data } = await axios.get<Page<T>>('/api/posts', {
    params: {
      keyword,
      page,
      postType,
      size,
      sort: sortField.concat(',', sortOption),
    },
    headers: {
      'Content-type': 'application/json',
    },
  });

  return data;
}

export default searchPosts;
