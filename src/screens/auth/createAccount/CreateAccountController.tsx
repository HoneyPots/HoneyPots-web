import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import CreateAccountView from './CreateAccountView';

import type { FC } from 'react';
import type { CreateAccountViewProps } from './CreateAccountView';

interface CreateAccountControllerControllerProps {
  examples?: any;
}

const CreateAccountControllerController: FC<CreateAccountControllerControllerProps> = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const viewProps: CreateAccountViewProps = {
    onBackClick: router.back,
    alertProps: {
      isOpen,
      onClose,
      body: '해당 닉네임으로 변경하시겠습니까?',
      header: '사용가능한 닉네임 입니다',
    },
    onButtonClick: onOpen,
  };
  return <CreateAccountView {...viewProps} />;
};

export default CreateAccountControllerController;
