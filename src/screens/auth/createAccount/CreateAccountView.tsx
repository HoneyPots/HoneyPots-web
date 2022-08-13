import { Button } from '@chakra-ui/react';
import Alert, { AlertProps } from 'components/chakra/Alert';
import Header from 'components/header';
import { InputLabel, TextInput } from 'components/input';
import Layout from 'components/layout/Layout';
import type { ChangeEventHandler, FC } from 'react';

export interface CreateAccountViewProps {
  onBackClick: VoidFunction;
  alertProps: AlertProps;
  onButtonClick: VoidFunction;
  inputProps: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
}

const CreateAccountView: FC<CreateAccountViewProps> = ({
  onBackClick,
  alertProps,
  onButtonClick,
  inputProps,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="back" onClick={onBackClick} />
      <Header.Center title="닉네임 설정" />
    </Header>
    <InputLabel>사용하실 닉네임을 입력해주세요</InputLabel>
    <TextInput
      placeholder="닉네임을 입력해주세요"
      value={inputProps.value}
      onChange={inputProps.onChange}
    />
    <Button
      width="100%"
      bgColor="#EBA937"
      marginTop={4}
      color="white"
      height="48px"
      fontWeight={700}
      onClick={onButtonClick}
    >
      중복확인
    </Button>
    <Alert {...alertProps} />
  </Layout>
);

export default CreateAccountView;
