import axios from 'libs/axios';
import { GroupBuyingStatus } from 'types/api/group-buying';

interface PutGBPostParams {
  postId: string;
  body: {
    title: string;
    content: string;
    category: string;
    chatRoomLink: string;
    deadline: number;
    groupBuyingStatus: GroupBuyingStatus;
  };
}

export default async function putGBPost({ postId, body }: PutGBPostParams) {
  const { data } = await axios.put(`/api/posts/group-buying/${postId}`, body, {
    headers: { 'Content-type': 'application/json' },
  });

  return data;
}
