import { useRouter } from 'next/router';
import SearchPostView from './SearchPostView';

import type { FC } from 'react';
import type { SearchPostViewProps } from './SearchPostView';

const SearchPostController: FC = () => {
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
