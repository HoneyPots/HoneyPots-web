import { useRouter } from 'next/router';
import MyGroupBuyingView, { MyGroupBuyingViewProps } from './MyGroupBuyingView';
import type { FC } from 'react';

const MyGroupBuyingController: FC = () => {
  const router = useRouter();

  const viewProps: MyGroupBuyingViewProps = { onHeaderClick: router.back };
  return <MyGroupBuyingView {...viewProps} />;
};

export default MyGroupBuyingController;
