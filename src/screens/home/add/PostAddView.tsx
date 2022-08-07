import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import Layout from 'components/layout/Layout';
import Alert, { AlertProps } from 'components/chakra/Alert';
import PostAddComponents from './components';
import type { ChangeEventHandler, FC } from 'react';

export interface PostAddViewProps {
  titleInputProps: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
  contentInputProps: {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
  };
  onButtonClick: VoidFunction;
  alertProps: AlertProps;
  onHeaderClick: VoidFunction;
}

const PostAddView: FC<PostAddViewProps> = ({
  contentInputProps,
  titleInputProps,
  onButtonClick,
  alertProps,
  onHeaderClick,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={onHeaderClick} />
      <Header.Center title="게시글 작성" />
    </Header>
    <InputLabel>
      제목<b> *</b>
    </InputLabel>
    <TextInput placeholder="제목을 입력해 주세요" {...titleInputProps} />
    <InputLabel>
      내용<b> *</b>
    </InputLabel>
    <TextArea placeholder="내용을 입력해 주세요" {...contentInputProps} />
    <PostAddComponents.DoneButton onClick={onButtonClick}>완료</PostAddComponents.DoneButton>
    <Alert {...alertProps} />
  </Layout>
);

export default PostAddView;
