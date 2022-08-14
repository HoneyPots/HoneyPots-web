import axios from 'libs/axios';
import { UploadAttachFile } from 'types/api/common';
import { GroupBuyingPostType } from 'types/api/group-buying';

export interface PostGBPostParams {
  title: string;
  content?: string;
  attachedFiles?: UploadAttachFile[];
  // goodsPrice: number;
  category: string;
  chatRoomLink: string;
  deadline: number;
}

export default async function postGBPost(body: PostGBPostParams) {
  const { data } = await axios.post<GroupBuyingPostType>(
    '/api/posts/group-buying',
    {
      ...body,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
}
