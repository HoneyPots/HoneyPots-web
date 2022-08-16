import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import PhotoInput, { PhotoInputProps } from 'components/input/PhotoInput';
import Alert from 'components/chakra/Alert';
import ErrorMsg from 'components/common/ErrorMsg';
import { UploadPhotoType } from 'types/api/common';
import Layout from 'components/layout/Layout';
import TradeAddComponents from './components';
import type { FC } from 'react';

interface FormType {
  photos: UploadPhotoType[];
  title: string;
  content: string;
  goodsPrice: number;
  // tradeType: TradeType;
  chatRoomLink: string;
}
export interface TradeAddViewProps {
  onHeaderClick: VoidFunction;
  onDoneButtonClick: VoidFunction;
  photoInputProps: PhotoInputProps;
  register: UseFormRegister<FormType>;
  isOpen: boolean;
  onClose: VoidFunction;
  // onTradeTypeChange: ChangeEventHandler<HTMLSelectElement>;
  errors: FieldErrorsImpl<DeepRequired<FormType>>;
}

const TradeAddView: FC<TradeAddViewProps> = ({
  onHeaderClick,
  photoInputProps,
  onDoneButtonClick,
  // onTradeTypeChange,
  register,
  isOpen,
  onClose,
  errors,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={onHeaderClick} />
      <Header.Center title="중고거래 작성" />
    </Header>
    <InputLabel>사진</InputLabel>
    <PhotoInput {...photoInputProps} />
    {/* <InputLabel>
      판매유무<b> *</b>
    </InputLabel> */}
    {/* <Select name="va" defaultValue="판매유무" onChange={onTradeTypeChange}>
      <option value="판매중">판매중</option>
      <option value="판매완료">판매완료</option>
    </Select> */}
    <InputLabel>
      제목<b> *</b>
    </InputLabel>
    <TextInput placeholder="제목을 입력해 주세요" {...register('title')} />
    <InputLabel>
      금액<b> *</b>
    </InputLabel>
    <TextInput
      placeholder="금액을 입력해 주세요 (원)"
      type="number"
      inputMode="numeric"
      {...register('goodsPrice', {
        valueAsNumber: true,
        max: { value: 9999999, message: '천만원까지만 입력할 수 있어요' },
      })}
    />
    <ErrorMsg>{errors.goodsPrice?.message}</ErrorMsg>
    <InputLabel>카카오톡 오픈 채팅 링크</InputLabel>
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
    <InputLabel>
      부가 설명<b> *</b>
    </InputLabel>
    <TextArea placeholder="내용 입력해 주세요" {...register('content')} />
    <TradeAddComponents.DoneButton onClick={onDoneButtonClick}>완료</TradeAddComponents.DoneButton>
    <Alert
      body="필수항목을 입력해주세요"
      header="알림"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={onClose}
    />
  </Layout>
);

export default TradeAddView;
