import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import Layout from 'components/layout/Layout';
import ErrorMsg from 'components/common/ErrorMsg';
import { GroupBuyingStatus } from 'types/api/group-buying';
import Alert from 'components/chakra/Alert';
import Select from 'components/input/Select';
import GroupBuyingEditComponents from './components';
import type { ChangeEventHandler, FC } from 'react';

export interface GBFormType {
  title: string;
  content: string;
  groupBuyingStatus: GroupBuyingStatus;
  category: string;
  chatRoomLink: string;
  hour?: number;
  min?: number;
}

export interface GroupBuyingEditViewProps {
  onHeaderClick: VoidFunction;
  register: UseFormRegister<GBFormType>;
  onDoneButtonClick: VoidFunction;
  isOpen: boolean;
  onClose: VoidFunction;
  onStatusChange: ChangeEventHandler<HTMLSelectElement>;
  errors: FieldErrorsImpl<DeepRequired<GBFormType>>;
  isSuccess: boolean;
  onCategoryChange: ChangeEventHandler<HTMLSelectElement>;
  groupBuyingStatusDefault: GroupBuyingStatus;
  categoryDefault: string;
}

const GroupBuyingEditView: FC<GroupBuyingEditViewProps> = ({
  onHeaderClick,
  isOpen,
  onClose,
  onDoneButtonClick,
  register,
  errors,
  isSuccess,
  onStatusChange,
  onCategoryChange,
  groupBuyingStatusDefault,
  categoryDefault,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={onHeaderClick} />
      <Header.Center title="공동구매 작성" />
    </Header>
    {isSuccess && (
      <>
        <InputLabel>
          진행유무<b> *</b>
        </InputLabel>
        <Select name="groupBuyingStatus" onChange={onStatusChange}>
          <option selected={groupBuyingStatusDefault === 'ONGOING'} value="ONGOING">
            진행중
          </option>
          <option selected={groupBuyingStatusDefault === 'COMPLETE'} value="COMPLETE">
            종료
          </option>
        </Select>
        <InputLabel>
          카테고리<b> *</b>
        </InputLabel>
        <Select name="카테고리" onChange={onCategoryChange}>
          <option selected={categoryDefault === '양식'} value="양식">
            양식
          </option>
          <option selected={categoryDefault === '일식'} value="일식">
            일식
          </option>
          <option selected={categoryDefault === '중식'} value="중식">
            중식
          </option>
          <option selected={categoryDefault === '한식'} value="한식">
            한식
          </option>
          <option selected={categoryDefault === '기타'} value="기타">
            기타
          </option>
        </Select>
        <ErrorMsg>{errors.category?.message}</ErrorMsg>
        <InputLabel>
          구매예정 시간<b> *</b>
        </InputLabel>
        <GroupBuyingEditComponents.TimeInputContainer>
          <GroupBuyingEditComponents.TimeInputWrapper>
            <TextInput
              placeholder="시간(0~100)"
              type="number"
              inputMode="numeric"
              {...register('hour', {
                valueAsNumber: true,
                max: {
                  value: 100,
                  message: '시간은 100이하 숫자만 입력해주세요',
                },
              })}
            />
            <span>시간</span>
          </GroupBuyingEditComponents.TimeInputWrapper>
          <GroupBuyingEditComponents.TimeInputWrapper>
            <TextInput
              placeholder="분(0~60)"
              type="number"
              inputMode="numeric"
              {...register('min', {
                valueAsNumber: true,
                max: {
                  value: 60,
                  message: '분은 60이하 숫자만 입력해주세요',
                },
              })}
            />
            <span>분 후 </span>
          </GroupBuyingEditComponents.TimeInputWrapper>
        </GroupBuyingEditComponents.TimeInputContainer>
        <ErrorMsg>{errors.hour?.message ? errors.hour?.message : errors.min?.message}</ErrorMsg>
        <InputLabel>
          제목<b> *</b>
        </InputLabel>
        <TextInput placeholder="제목을 입력해 주세요" {...register('title')} />
        <InputLabel>
          카카오톡 오픈 채팅 링크<b> *</b>
        </InputLabel>
        <TextInput
          placeholder="링크을 입력해 주세요"
          type="url"
          inputMode="url"
          {...register('chatRoomLink')}
        />
        <InputLabel>부가 설명</InputLabel>
        <TextArea placeholder="내용 입력해 주세요" {...register('content')} />
      </>
    )}
    <GroupBuyingEditComponents.DoneButton onClick={onDoneButtonClick}>
      완료
    </GroupBuyingEditComponents.DoneButton>
    <Alert
      body="필수항목을 입력해주세요"
      header="알림"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={onClose}
    />
  </Layout>
);

export default GroupBuyingEditView;
