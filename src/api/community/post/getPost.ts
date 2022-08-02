import axios from 'libs/axios';
import { Post } from 'types/api/common';

interface GetPostParameter {
  postId: string;
}

export const getPostKey = (params: GetPostParameter): [string, GetPostParameter] => [
  '/api/posts/normal',
  params,
];

export default async function getPost({ postId }: GetPostParameter) {
  const { data } = await axios.get<Post>(`/api/posts/normal/${postId}`);

  return data;
}
