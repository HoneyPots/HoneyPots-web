import axios from 'libs/axios';
import { PostType } from 'types/api/common';

interface GetPostParameter {
  postId: string;
}

export const getPostKey = (params: GetPostParameter): [string, GetPostParameter] => [
  '/api/posts/normal',
  params,
];

export default async function getPost({ postId }: GetPostParameter) {
  const { data } = await axios.get<PostType>(`/api/posts/normal/${postId}`);

  return data;
}
