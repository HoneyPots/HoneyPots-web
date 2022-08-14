import styled from 'styled-components';

const ErrorMsg = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.color.red};
  padding: 8px 0px 12px;
`;

export default ErrorMsg;
