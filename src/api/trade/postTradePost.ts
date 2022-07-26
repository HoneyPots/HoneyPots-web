import axios from 'libs/axios';

import type { UploadAttachFile, UsedTradePost } from 'types/api/common';

export interface PostTradePostParams {
  title: string;
  content: string;
  attachedFiles?: UploadAttachFile[];
  goodsPrice: number;
  // tradeType: TradeType;
  chatRoomLink: string;
}

export default async function postTradePost(body: PostTradePostParams) {
  const { data } = await axios.post<UsedTradePost>(
    '/api/posts/used-trades',
    {
      tradeType: 'SELL',
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
