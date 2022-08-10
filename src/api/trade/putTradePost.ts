import axios from 'libs/axios';
import { TradeStatus, TradeType } from 'types/api/used-trades';

interface PutTradePostParams {
  postId: string;
  body: {
    title: string;
    content: string;
    goodsPrice: number;
    tradeType: TradeType;
    chatRoomLink: string;
    tradeStatus: TradeStatus;
  };
}

export default async function putTradePost({ postId, body }: PutTradePostParams) {
  const { data } = await axios.put(`/api/posts/normal/${postId}`, body, {
    headers: { 'Content-type': 'application/json' },
  });

  return data;
}
