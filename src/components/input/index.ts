import styled from 'styled-components';

const InputLabel = styled.label`
  font-size: 17px;
  line-height: 22px;
  font-weight: bold;
  color: #191919;
  display: block;
  margin-bottom: 12px;
  margin-top: 24px;
`;

const TextInput = styled.input`
  padding: 10px 15px;
  font-size: 14px;
  letter-spacing: -0.4px;
  ::placeholder {
    color: #717171;
  }
  width: 100%;

  border-radius: 4px;
  border: 1px solid #e1e1e1;
  :focus {
    outline: ${(props) => props.theme.color.main} solid 1px;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 15px;
  font-size: 14px;
  letter-spacing: -0.4px;
  ::placeholder {
    color: #717171;
  }
  :focus {
    outline: ${(props) => props.theme.color.main} solid 1px;
  }
  width: calc(100%);
  height: 300px;

  border-radius: 4px;
  border: 1px solid #e1e1e1;
`;

export { InputLabel, TextInput, TextArea };
