import MeView from './MeView';

import type { FC } from 'react';
import type { MeViewProps } from './MeView';

interface MeControllerControllerProps {
  examples?: any;
}

const MeControllerController: FC<MeControllerControllerProps> = () => {
  const viewProps: MeViewProps = {};
  return <MeView {...viewProps} />;
};

export default MeControllerController;
