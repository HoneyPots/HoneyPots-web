import { useRouter } from 'next/router';
import SearchTradeView from './SearchTradeView';

import type { FC } from 'react';
import type { SearchTradeViewProps } from './SearchTradeView';

interface SearchTradeControllerProps {
  examples?: any;
}

const SearchTradeController: FC<SearchTradeControllerProps> = () => {
  const router = useRouter();

  const viewProps: SearchTradeViewProps = {
    searchViewProps: {
      onBackClick: router.back,
      onChange: () => {},
      value: '빨간 우산',
    },
  };
  return <SearchTradeView {...viewProps} />;
};

export default SearchTradeController;
