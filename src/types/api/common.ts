/* eslint-disable @typescript-eslint/no-empty-interface */
export interface User {
  id: number;
  nickname: string;
}

type ReactionType = 'LIKE';

type TargetType = 'POST' | 'COMMENT';

export interface Writer extends User {}
export interface Reactor extends User {}

export interface PostType {
  postId: number;
  title: string;
  content: string;
  writer: Writer;
  commentCount: number;
  uploadedAt: string;
  lastModifiedAt: string;
  isLiked: boolean;
  likeReactionCount: number;
  likeReactionId: number;
}

export interface Comment {
  postId: number;
  commentId: number;
  writer: Writer;
  createdAt: string;
  lastModifiedAt: string;
  content: string;
}

export interface Reaction {
  reactionId: number;
  targetId: number;
  targetType: TargetType;
  reactionType: ReactionType;
  reactor: Reactor;
  alreadyExists: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean; // 마지막 페이지 여부
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // 현재 페이지 번호
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface AttachFile {
  fileId: number;
  fileLocationUrl: string;
}

export interface UploadAttachFile {
  fileId: number;
  willBeUploaded: boolean;
}

export type FileType = 'NORMAL_POST_IMAGE' | 'USED_TRADE_POST_IMAGE';

export interface PreFile {
  fileId: number;
  filename: string;
  originalFilename: string;
  filePath: string;
  fileType: FileType;
  presignedUrl: string;
}

export interface UsedTradePost {
  postId: number;
  title: string;
  content: string;
  writer: Writer;
  commentCount: number;
  likeReactionCount: number;
  isLiked: boolean;
  likeReactionId: number;
  thumbnailImageFile?: AttachFile;
  attachedFiles?: AttachFile[];
  uploadedAt: string;
  lastModifiedAt: string;
  goodsPrice: number;
  tradeType: string;
  tradeStatus: string;
  chatRoomLink: string;
}

export type Photo = Record<'photo' | `photo${number}`, File | string> & Record<'id', string>;
export interface UploadPhotoType {
  id_number: number;
  photo: File | string;
  url: string;
}
