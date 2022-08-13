import axios from 'libs/axios';
import { GroupBuyingPostType } from 'types/api/group-buying';

interface GetGBPostParameter {
  postId: string;
}

export const getGBPostKey = (params: GetGBPostParameter): [string, GetGBPostParameter] => [
  '/api/posts/group-buying',
  params,
];

export default async function getGBPost({ postId }: GetGBPostParameter) {
  const { data } = await axios.get<GroupBuyingPostType>(`/api/posts/group-buying/${postId}`, {
    headers: { 'Content-type': 'application/json' },
  });

  return data;
}
