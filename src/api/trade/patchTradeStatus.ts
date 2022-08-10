import axios from 'axios';
import { TradeStatus } from 'types/api/used-trades';

interface PatchTradeStatusParams {
  usedTradePostId: number;
  tradeStatus: TradeStatus;
}

export default async function patchTradeStatus({
  usedTradePostId,
  tradeStatus,
}: PatchTradeStatusParams) {
  const { data } = await axios.patch(
    `/api/posts/used-trades/${usedTradePostId}`,
    { tradeStatus },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
}
