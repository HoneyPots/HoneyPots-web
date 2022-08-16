import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import PhotoInput, { PhotoInputProps } from 'components/input/PhotoInput';
import Layout from 'components/layout/Layout';
import { UploadPhotoType } from 'types/api/common';
import ErrorMsg from 'components/common/ErrorMsg';
import Alert from 'components/chakra/Alert';
import Select from 'components/input/Select';
import GroupBuyingAddComponents from './components';
import type { ChangeEventHandler, FC } from 'react';

export interface GBFormType {
  photos: UploadPhotoType[];
  title: string;
  content: string;
  // goodsPrice: number;
  // tradeType: TradeType;
  category: string;
  chatRoomLink: string;
  hour?: number;
  min?: number;
}

export interface GroupBuyingAddViewProps {
  onHeaderClick: VoidFunction;
  photoInputProps: PhotoInputProps;
  register: UseFormRegister<GBFormType>;
  onDoneButtonClick: VoidFunction;
  isOpen: boolean;
  onClose: VoidFunction;
  onCategoryChange: ChangeEventHandler<HTMLSelectElement>;
  errors: FieldErrorsImpl<DeepRequired<GBFormType>>;
}

const GroupBuyingAddView: FC<GroupBuyingAddViewProps> = ({
  onHeaderClick,
  photoInputProps,
  isOpen,
  onClose,
  onDoneButtonClick,
  register,
  onCategoryChange,
  errors,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={onHeaderClick} />
      <Header.Center title="공동구매 작성" />
    </Header>
    <InputLabel>사진</InputLabel>
    <PhotoInput {...photoInputProps} />
    <InputLabel>
      카테고리<b> *</b>
    </InputLabel>
    <Select name="카테고리" onChange={onCategoryChange}>
      <option value="양식">양식</option>
      <option value="일식">일식</option>
      <option value="중식">중식</option>
      <option value="한식">한식</option>
      <option value="기타">기타</option>
    </Select>
    <ErrorMsg>{errors.category?.message}</ErrorMsg>
    <InputLabel>
      구매예정 시간<b> *</b>
    </InputLabel>
    <GroupBuyingAddComponents.TimeInputContainer>
      <GroupBuyingAddComponents.TimeInputWrapper>
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
      </GroupBuyingAddComponents.TimeInputWrapper>
      <GroupBuyingAddComponents.TimeInputWrapper>
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
      </GroupBuyingAddComponents.TimeInputWrapper>
    </GroupBuyingAddComponents.TimeInputContainer>
    <ErrorMsg>{errors.hour?.message ? errors.hour?.message : errors.min?.message}</ErrorMsg>
    <InputLabel>
      제목<b> *</b>
    </InputLabel>
    <TextInput placeholder="제목을 입력해 주세요" {...register('title')} />
    <InputLabel>
      카카오톡 오픈 채팅 링크<b> *</b>
    </InputLabel>
    <TextInput
      placeholder="https://open.kakao.com/o/examples"
      type="url"
      inputMode="url"
      {...register('chatRoomLink', {
        pattern: {
          value: /^(https?:\/\/)([^/]*)(open\.kakao\.com\/.*)\w+/g,
          message: '올바른 링크를 입력해주세요',
        },
      })}
    />
    <ErrorMsg>{errors.chatRoomLink?.message}</ErrorMsg>
    <InputLabel>부가 설명</InputLabel>
    <TextArea placeholder="내용 입력해 주세요" {...register('content')} />
    <GroupBuyingAddComponents.DoneButton onClick={onDoneButtonClick}>
      완료
    </GroupBuyingAddComponents.DoneButton>
    <Alert
      body="필수항목을 입력해주세요"
      header="알림"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={onClose}
    />
  </Layout>
);

export default GroupBuyingAddView;
