/* eslint-disable @typescript-eslint/no-empty-interface */
export interface User {
  id: number;
  nickname: string;
}

type ReactionType = 'LIKE';

type TargetType = 'POST' | 'COMMENT';

interface Writer extends User {}
interface Reactor extends User {}

export interface PostType {
  postId: number;
  title: string;
  content: string;
  writer: Writer;
  commentCount: number;
  uploadedAt: string;
  lastModifiedAt: string;
}

export interface Comment {
  postId: number;
  commentId: number;
  writer: Writer;
  createdAt: string;
  lastModifiedAt: string;
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
