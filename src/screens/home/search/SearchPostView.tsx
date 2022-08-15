import Post, { PostProps } from 'components/post';
import Observer from 'components/observer/Observer';
import { PostType } from 'types/api/common';
import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import type { FC } from 'react';

export interface SearchPostViewProps {
  searchViewProps: SearchViewProps;
  each(post: PostType): PostProps;
  posts: PostType[];
  handleObserver: VoidFunction;
}

const SearchPostView: FC<SearchPostViewProps> = ({
  searchViewProps,
  each,
  handleObserver,
  posts,
}) => (
  <SearchView {...searchViewProps}>
    {posts.map((item) => (
      <Post {...each(item)} key={item.postId} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
  </SearchView>
);

export default SearchPostView;
