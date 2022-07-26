import axios from 'libs/axios';

interface PutPostRequest {
  postId: string;
  title: string;
  content: string;
}

export const putPostKey = ({ postId }: { postId: string }) => ['/api/posts/normal/', postId];

export default async function putPost({ postId, content, title }: PutPostRequest) {
  const { data } = await axios.put(
    `/api/posts/normal/${postId}`,
    { title, content },
    { headers: { 'Content-type': 'application/json' } },
  );

  return data;
}
