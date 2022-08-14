import styled from 'styled-components';

const DoneButton = styled.a`
  position: fixed;
  bottom: 10px;
  padding: 8px 18px;
  background-color: ${(props) => props.theme.color.main};
  border-radius: 80px;
  font-size: 16px;

  left: 50%;
  transform: translateX(-50%);
  line-height: 22px;
  color: #fff;
`;

const TimeInputContainer = styled.div`
  display: flex;
  gap: 0px 20px;
`;

const TimeInputWrapper = styled.div`
  min-width: 33%;

  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #191919;
  span {
    margin-left: 8px;
    min-width: max-content;
    word-break: keep-all;
  }
`;

const GroupBuyingEditComponents = { DoneButton, TimeInputContainer, TimeInputWrapper };

export default GroupBuyingEditComponents;
