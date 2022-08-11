import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import PhotoInput, { PhotoInputProps } from 'components/input/PhotoInput';
import Layout from 'components/layout/Layout';
import Select from 'components/input/Select';
import TradeAddComponents from './components';
import type { FC } from 'react';

export interface TradeAddViewProps {
  onHeaderClick: VoidFunction;
  onDoneButtonClick: VoidFunction;
  photoInputProps: PhotoInputProps;
}

const TradeAddView: FC<TradeAddViewProps> = ({
  onHeaderClick,
  photoInputProps,
  onDoneButtonClick,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={onHeaderClick} />
      <Header.Center title="중고거래 작성" />
    </Header>
    <InputLabel>사진</InputLabel>
    <PhotoInput {...photoInputProps} />
    <InputLabel>
      판매유무<b> *</b>
    </InputLabel>
    <Select name="va" defaultValue="판매유무">
      <option value="판매중">판매중</option>
      <option value="판매 완료">판매완료</option>
    </Select>
    <InputLabel>
      제목<b> *</b>
    </InputLabel>
    <TextInput placeholder="제목을 입력해 주세요" />
    <InputLabel>
      금액<b> *</b>
    </InputLabel>
    <TextInput placeholder="금액을 입력해 주세요" type="number" inputMode="numeric" />
    <InputLabel>카카오톡 오픈 채팅 링크</InputLabel>
    <TextInput placeholder="링크을 입력해 주세요" type="url" inputMode="url" />
    <InputLabel>부가 설명</InputLabel>
    <TextArea placeholder="내용 입력해 주세요" />
    <TradeAddComponents.DoneButton onClick={onDoneButtonClick}>완료</TradeAddComponents.DoneButton>
  </Layout>
);

export default TradeAddView;
