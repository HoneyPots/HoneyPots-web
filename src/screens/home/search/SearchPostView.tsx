import Post from 'components/post';
import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import type { FC } from 'react';

export interface SearchPostViewProps {
  searchViewProps: SearchViewProps;
}

const SearchPostView: FC<SearchPostViewProps> = ({ searchViewProps }) => (
  <SearchView {...searchViewProps}>
    <Post
      commentCount={10}
      content="검색용 테스트도 아주 잘되고 잘만든거 ㅋㅋㅋ같은데? 정식 버전 나오면 정말 잘 사용할 것 같아요 ㅋㅋㅋㅋㅋ"
      isLiked={false}
      lastModifiedAt="123"
      likeReactionCount={31}
      likeReactionId={1}
      postId={0}
      title="꿀단지 이게 무야!!!"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 2' }}
    />
    <Post
      commentCount={0}
      content="꿀단지가 좋아~"
      isLiked
      lastModifiedAt="123"
      likeReactionCount={1}
      likeReactionId={1}
      postId={0}
      title="꿀단지 이거 정말 잘만든 어플 같아요!!"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 12' }}
    />
    <Post
      commentCount={10}
      content="꿀단지 무슨 대회 나가서 수상하는거 봤는데 잘되길 바래요"
      isLiked
      lastModifiedAt="123"
      likeReactionCount={2}
      likeReactionId={1}
      postId={0}
      title="대회 나건거 봤음?"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 12' }}
    />
    <Post
      commentCount={10}
      content="꿀: 꿀꿀, 단: 단단해, 지:지지지지 베베베베베베"
      isLiked={false}
      lastModifiedAt="123"
      likeReactionCount={31}
      likeReactionId={1}
      postId={0}
      title="꿀단지로 삼행시 해봄"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 12' }}
    />
    <Post
      commentCount={10}
      content="검색용 테스트도 아주 잘되고 잘만든거 같은데? 정식 버전 나오면 정말 잘 사용할 것 같아요 ㅋㅋㅋㅋㅋ"
      isLiked
      lastModifiedAt="123"
      likeReactionCount={1}
      likeReactionId={1}
      postId={0}
      title="꿀단지 이거 정말 잘만든 어플 같아요!!"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 12' }}
    />
    <Post
      commentCount={10}
      content="검색용 테스트도 아주 잘되고 잘만든거 같은데? 정식 버전 나오면 정말 잘 사용할 것 같아요 ㅋㅋㅋㅋㅋ"
      isLiked
      lastModifiedAt="123"
      likeReactionCount={31}
      likeReactionId={1}
      postId={0}
      title="꿀단지 이거 정말 잘만든 어플 같아요!!"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 12' }}
    />
    <Post
      commentCount={10}
      content="검색용 테스트도 아주 잘되고 잘만든거 같은데? 정식 버전 나오면 정말 잘 사용할 것 같아요 ㅋㅋㅋㅋㅋ"
      isLiked
      lastModifiedAt="123"
      likeReactionCount={31}
      likeReactionId={1}
      postId={0}
      title="꿀단지 이거 정말 잘만든 어플 같아요!!"
      uploadedAt={new Date('2022-8-5').toString()}
      writer={{ id: 0, nickname: '헤리움 12' }}
    />
  </SearchView>
);

export default SearchPostView;
