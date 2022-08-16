import { Button } from '@chakra-ui/react';
import Alert, { AlertProps } from 'components/chakra/Alert';
import ErrorMsg from 'components/common/ErrorMsg';
import Header from 'components/header';
import { InputLabel, TextInput } from 'components/input';
import Layout from 'components/layout/Layout';
import type { ChangeEventHandler, FC } from 'react';

export interface CreateAccountViewProps {
  onBackClick: VoidFunction;
  alertProps: AlertProps;
  noAlertProps: AlertProps;
  onButtonClick: VoidFunction;
  inputProps: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
  buttonDisabled: boolean;
}

const CreateAccountView: FC<CreateAccountViewProps> = ({
  onBackClick,
  alertProps,
  onButtonClick,
  inputProps,
  noAlertProps,
  buttonDisabled,
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
    <ErrorMsg>{buttonDisabled && '닉네임은 10글자 까지 가능합니다'}</ErrorMsg>
    <Button
      width="100%"
      bgColor="#EBA937"
      marginTop={4}
      color="white"
      height="48px"
      fontWeight={700}
      onClick={onButtonClick}
      disabled={buttonDisabled}
    >
      중복확인
    </Button>
    <Alert {...alertProps} />
    <Alert {...noAlertProps} />
  </Layout>
);

export default CreateAccountView;
