import { AttachFile, Writer } from './common';
import { TradeStatus } from './used-trades';

export type GroupBuyingStatus = TradeStatus;

export interface GroupBuyingPostType {
  postId: number;
  title: string;
  content: string;
  writer: Writer;
  commentCount: number;
  likeReactionCount: number;
  isLiked: boolean;
  likeReactionId: number;
  thumbnailImageFile: AttachFile;
  attachedFiles: AttachFile[];
  uploadedAt: string;
  lastModifiedAt: string;
  goodsPrice: number;
  category: string;
  groupBuyingStatus: GroupBuyingStatus;
  chatRoomLink: string;
  deadline: number;
}
