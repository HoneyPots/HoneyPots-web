import axios from 'libs/axios';
import { UsedTradePost } from 'types/api/common';

interface GetTradePostParameter {
  postId: string;
}

export const getTradePostKey = (params: GetTradePostParameter): [string, GetTradePostParameter] => [
  '/api/posts/used-trades',
  params,
];

export default async function getTradePost({ postId }: GetTradePostParameter) {
  const { data } = await axios.get<UsedTradePost>(`/api/posts/used-trades/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
}
