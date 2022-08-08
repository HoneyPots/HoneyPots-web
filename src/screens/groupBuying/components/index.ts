import styled from 'styled-components';

const WriteButton = styled.a`
  position: fixed;
  bottom: 62px;
  padding: 8px 18px;
  background-color: ${(props) => props.theme.color.main};
  border-radius: 80px;
  font-size: 16px;

  left: 50%;
  transform: translateX(-50%);
  line-height: 22px;
  color: #fff;
  font-weight: bold;
`;

const GroupBuyingComponents = { WriteButton };

export default GroupBuyingComponents;
