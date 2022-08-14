import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import Header from 'components/header';
import { InputLabel, TextArea, TextInput } from 'components/input';
import Alert from 'components/chakra/Alert';
import ErrorMsg from 'components/common/ErrorMsg';
import { TradeStatus } from 'types/api/used-trades';
import Select from 'components/input/Select';
import Layout from 'components/layout/Layout';
import TradeEditComponents from './components';
import type { ChangeEventHandler, FC } from 'react';

interface FormType {
  title: string;
  content: string;
  goodsPrice: number;
  chatRoomLink: string;
  tradeStatus: TradeStatus;
}

export interface TradeEditViewProps {
  onHeaderClick: VoidFunction;
  onDoneButtonClick: VoidFunction;
  register: UseFormRegister<FormType>;
  isOpen: boolean;
  onClose: VoidFunction;
  onTradeTypeChange: ChangeEventHandler<HTMLSelectElement>;
  errors: FieldErrorsImpl<DeepRequired<FormType>>;
  isSuccess: boolean;
  tradeStatusDefault: TradeStatus;
}

const TradeEditView: FC<TradeEditViewProps> = ({
  onHeaderClick,
  onDoneButtonClick,
  onTradeTypeChange,
  register,
  isOpen,
  onClose,
  errors,
  isSuccess,
  tradeStatusDefault,
}) => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={onHeaderClick} />
      <Header.Center title="중고거래 수정" />
    </Header>
    {isSuccess && (
      <>
        <InputLabel>
          판매유무<b> *</b>
        </InputLabel>
        <Select name="tradeStatus" onChange={onTradeTypeChange}>
          <option selected={tradeStatusDefault === 'ONGOING'} value="ONGOING">
            판매중
          </option>
          <option selected={tradeStatusDefault === 'COMPLETE'} value="COMPLETE">
            판매완료
          </option>
        </Select>
        <InputLabel>
          제목<b> *</b>
        </InputLabel>
        <TextInput placeholder="제목을 입력해 주세요" {...register('title')} />
        <InputLabel>
          금액<b> *</b>
        </InputLabel>
        <TextInput
          placeholder="금액을 입력해 주세요"
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
          placeholder="링크을 입력해 주세요"
          type="url"
          inputMode="url"
          {...register('chatRoomLink')}
        />
        <InputLabel>
          부가 설명<b> *</b>
        </InputLabel>
        <TextArea placeholder="내용 입력해 주세요" {...register('content')} />
      </>
    )}
    <TradeEditComponents.DoneButton onClick={onDoneButtonClick}>
      완료
    </TradeEditComponents.DoneButton>
    <Alert
      body="필수항목을 입력해주세요"
      header="알림"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={onClose}
    />
  </Layout>
);

export default TradeEditView;
