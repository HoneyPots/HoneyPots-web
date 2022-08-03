import { ChangeEventHandler, FC, useRef, useState } from 'react';
import styled from 'styled-components';
import SubmitSvg from 'assets/svgs/SubmitSvg';

const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 52px;
  width: 100%;
  box-sizing: border-box;
  -webkit-backdrop-filter: blur(5px) brightness(1.1) grayscale(1.1);
  backdrop-filter: blur(5px) brightness(1.2);
  padding: 8px 16px 16px;
`;

const Container = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: flex-end;

  background: #fff;
  box-sizing: border-box;
  height: max-content;
  width: 100%;
  padding: 10px 16px 8px;

  border: ${(props) =>
    props.isFocused ? `1px solid ${props.theme.color.main}` : '1px solid #e1e1e1'};

  border-radius: 20px;
`;

const Input = styled.textarea`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.56px;
  color: #191919;
  ::placeholder {
    color: #717171;
  }

  overflow: auto;
  vertical-align: top;
  resize: none;
  height: 22px;
  max-height: 200px;
  border: none;
  :focus {
    outline: none;
  }
`;

const Submit = styled.div``;

export interface CommentInputProps {
  onSubmitClick: VoidFunction;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const CommentInput: FC<CommentInputProps> = ({ onChange, onSubmitClick, value }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Backdrop>
      <Container isFocused={isFocused}>
        <Input
          placeholder="댓글 달기..."
          ref={textAreaRef}
          onChange={(e) => {
            onChange(e);
            if (textAreaRef.current) {
              textAreaRef.current.style.height = '16px';
              textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
            }
          }}
          onFocus={(e) => {
            setIsFocused(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
          }}
          value={value}
          typeof="string"
        />
        <Submit onClick={onSubmitClick}>
          <SubmitSvg />
        </Submit>
      </Container>
    </Backdrop>
  );
};

export default CommentInput;
