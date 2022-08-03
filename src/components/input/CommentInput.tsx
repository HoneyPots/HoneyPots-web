import styled from 'styled-components';
import Image from 'next/image';
import submit from 'assets/images/input/submit.png';
import type { ChangeEventHandler, FC } from 'react';

const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 30px;
  width: 100%;

  backdrop-filter: blur(10px);
  padding: 0px 16px 16px;
  background: #f2ff;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  background: #f2ff;
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  padding: 0px 16px;

  border-radius: 20px;
`;

const Input = styled.div`
  font-size: 14px;
  font-weight: 500;
  height: 30px;
  letter-spacing: -0.56px;
  color: #191919;
  ::placeholder {
    color: #717171;
  }
`;

const Submit = styled.div``;

interface CommentInputProps {
  onSubmitClick: VoidFunction;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CommentInput: FC<CommentInputProps> = ({ onChange, onSubmitClick, value }) => {
  return (
    <Backdrop>
      <Container>
        <Input placeholder="댓글 달기..." />
        <Submit>
          <Image src={submit} width={40} />
        </Submit>
      </Container>
    </Backdrop>
  );
};

export default CommentInput;
