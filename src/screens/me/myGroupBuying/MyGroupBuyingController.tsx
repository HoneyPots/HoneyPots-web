import { useRouter } from 'next/router';
import MyGroupBuyingView, { MyGroupBuyingViewProps } from './MyGroupBuyingView';
import type { FC } from 'react';

interface MyGroupBuyingControllerProps {
  examples?: any;
}

const MyGroupBuyingController: FC<MyGroupBuyingControllerProps> = () => {
  const router = useRouter();

  const viewProps: MyGroupBuyingViewProps = { onHeaderClick: router.back };
  return <MyGroupBuyingView {...viewProps} />;
};

export default MyGroupBuyingController;
