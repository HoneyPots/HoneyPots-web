import CreateAccountView from './CreateAccountView';

import type { FC } from 'react';
import type { CreateAccountViewProps } from './CreateAccountView';

interface CreateAccountControllerControllerProps {
  examples?: any;
}

const CreateAccountControllerController: FC<CreateAccountControllerControllerProps> = () => {
  const viewProps: CreateAccountViewProps = {};
  return <CreateAccountView {...viewProps} />;
};

export default CreateAccountControllerController;
