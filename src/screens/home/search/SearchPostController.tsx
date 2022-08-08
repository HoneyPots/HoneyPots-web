import { useRouter } from 'next/router';
import SearchPostView from './SearchPostView';

import type { FC } from 'react';
import type { SearchPostViewProps } from './SearchPostView';

interface SearchPostControllerProps {
  examples?: any;
}

const SearchPostController: FC<SearchPostControllerProps> = () => {
  const router = useRouter();

  const viewProps: SearchPostViewProps = {
    searchViewProps: {
      onBackClick: router.back,
      onChange: () => {},
      value: '꿀단지',
    },
  };
  return <SearchPostView {...viewProps} />;
};

export default SearchPostController;
