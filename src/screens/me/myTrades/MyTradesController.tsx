import { useRouter } from 'next/router';
import MyTradesView, { MyTradesViewProps } from './MyTradesView';

import type { FC } from 'react';

interface MyTradesControllerProps {
  examples?: any;
}

const MyTradesController: FC<MyTradesControllerProps> = () => {
  const router = useRouter();

  const viewProps: MyTradesViewProps = {
    onHeaderClick: router.back,
  };
  return <MyTradesView {...viewProps} />;
};

export default MyTradesController;
