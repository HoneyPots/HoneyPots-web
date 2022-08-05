import { useFieldArray, useForm } from 'react-hook-form';
import HeaderCenter from 'components/header/HeaderCenter';
import Header from 'components/header';
import HeaderLeft from 'components/header/HeaderLeft';
import { InputLabel, Selection, TextArea, TextInput } from 'components/input';
import PhotoInput from 'components/input/PhotoInput';
import Layout from 'components/layout/Layout';
import Select from 'components/input/Select';
import TradeAddComponents from './components';
import type { FC } from 'react';

export interface TradeAddViewProps {
  onHeaderClick: VoidFunction;
}

interface FormProps {
  photos: {
    photo: File | string;
  }[];
}

const TradeAddView: FC<TradeAddViewProps> = ({ onHeaderClick }) => {
  const { control } = useForm<FormProps>();
  const { append, fields, remove } = useFieldArray({ name: 'photos', control });

  return (
    <Layout>
      <Header>
        <HeaderLeft iconType="close" onClick={onHeaderClick} />
        <HeaderCenter title="중고거래 작성" />
      </Header>
      <InputLabel>사진</InputLabel>
      <PhotoInput append={append} fields={fields} onClick={() => {}} remove={remove} />
      <InputLabel>판매유무</InputLabel>
      <Select name="va" defaultValue="판매유무">
        <option value="판매중">판매중</option>
        <option value="판매 완료">판매완료</option>
      </Select>
      <InputLabel>제목</InputLabel>
      <TextInput placeholder="제목을 입력해 주세요" />
      <InputLabel>금액</InputLabel>
      <TextInput placeholder="금액을 입력해 주세요" type="number" inputMode="numeric" />
      <InputLabel>카카오톡 오픈 채팅 링크(선택)</InputLabel>
      <TextInput placeholder="링크을 입력해 주세요" type="url" inputMode="url" />
      <InputLabel>부가 설명</InputLabel>
      <TextArea placeholder="내용 입력해 주세요" />
      <TradeAddComponents.DoneButton onClick={() => {}}>완료</TradeAddComponents.DoneButton>
    </Layout>
  );
};

export default TradeAddView;
