import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import patchNickname from 'api/members/patchNickname';
import { RootState } from 'libs/store/modules';
import CreateAccountView from './CreateAccountView';

import type { CreateAccountViewProps } from './CreateAccountView';

const CreateAccountControllerController: FC = () => {
  const router = useRouter();
  const userId = useSelector<RootState, number | undefined>(({ user }) => user.userId);
  const [inputValue, setInputValue] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate } = useMutation(patchNickname, {
    onSuccess: () => router.back(),
  });

  const viewProps: CreateAccountViewProps = {
    onBackClick: router.back,
    alertProps: {
      isOpen,
      onClose,
      body: '해당 닉네임으로 변경하시겠습니까?',
      header: '사용가능한 닉네임 입니다',
      onButtonClick: () => {
        if (userId) {
          mutate({ memberId: userId, nickname: inputValue });
        }
      },
    },
    inputProps: {
      onChange: (event) => setInputValue(event.currentTarget.value),
      value: inputValue,
    },
    onButtonClick: onOpen,
  };
  return <CreateAccountView {...viewProps} />;
};

export default CreateAccountControllerController;
