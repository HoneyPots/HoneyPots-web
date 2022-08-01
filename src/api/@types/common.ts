/**
 * yyyyMMddHHmmss
 */
type Time = string;
/**
 * ex) 2022-07-28T23:56:21.8215431
 */
type LongTime = string;

export interface User {
  id: number;
  nickname: string;
}

type Writer = User;
type Reactor = User;

export interface Post {
  postId: number;
  title: string;
  content: string;
  writer: Writer;
  commentCount: number;
  uploadedAt: LongTime;
  lastModifiedAt: LongTime;
}

export interface Comment {
  postId: number;
  commentId: number;
  writer: Writer;
  createdAt: LongTime;
  lastModifiedAt: LongTime;
}

type ReactionType = 'LIKE';

type TargetType = 'POST' | 'COMMENT';

export interface Reaction {
  reactionId: number;
  targetId: number;
  targetType: TargetType;
  reactionType: ReactionType;
  reator: Reactor;
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

// export type ApiResponse<T = any> = {
//   result: T;
//   code: number;
//   status: 'OK' | 'ERROR';
//   messages: string[];
// };
