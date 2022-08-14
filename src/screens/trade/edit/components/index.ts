import styled from 'styled-components';

const DoneButton = styled.button`
  position: fixed;
  bottom: 10px;
  padding: 8px 18px;
  background-color: ${(props) => (props.disabled ? '#fad79b' : props.theme.color.main)};
  border-radius: 80px;
  font-size: 16px;
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
  line-height: 22px;
  color: #fff;
`;

const TradeEditComponents = { DoneButton };

export default TradeEditComponents;
