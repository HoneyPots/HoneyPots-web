import { useFieldArray, useForm } from 'react-hook-form';
import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import PhotoInput from 'components/input/PhotoInput';
import Layout from 'components/layout/Layout';
import Select from 'components/input/Select';
import GroupBuyingAddComponents from './components';
import type { FC } from 'react';

export interface GroupBuyingAddViewProps {
  onHeaderClick: VoidFunction;
}

interface FormProps {
  photos: {
    photo: File | string;
  }[];
}

const GroupBuyingAddView: FC<GroupBuyingAddViewProps> = ({ onHeaderClick }) => {
  const { control } = useForm<FormProps>();
  const { append, fields, remove } = useFieldArray({ name: 'photos', control });

  return (
    <Layout>
      <Header>
        <Header.Left iconType="close" onClick={onHeaderClick} />
        <Header.Center title="공동구매 작성" />
      </Header>
      <InputLabel>사진</InputLabel>
      <PhotoInput append={append} fields={fields} onClick={() => {}} remove={remove} />
      <InputLabel>
        진행유무<b> *</b>
      </InputLabel>
      <Select name="진행유무" defaultValue="진행유무">
        <option value="진행중">진행중</option>
        <option value="종료">종료</option>
      </Select>
      <InputLabel>
        시간<b> *</b>
      </InputLabel>
      <TextInput placeholder="시간을 입력해 주세요" />
      <InputLabel>
        제목<b> *</b>
      </InputLabel>
      <TextInput placeholder="제목을 입력해 주세요" />
      <InputLabel>
        카카오톡 오픈 채팅 링크<b> *</b>
      </InputLabel>
      <TextInput placeholder="링크을 입력해 주세요" type="url" inputMode="url" />
      <InputLabel>부가 설명</InputLabel>
      <TextArea placeholder="내용 입력해 주세요" />
      <GroupBuyingAddComponents.DoneButton onClick={() => {}}>
        완료
      </GroupBuyingAddComponents.DoneButton>
    </Layout>
  );
};

export default GroupBuyingAddView;
