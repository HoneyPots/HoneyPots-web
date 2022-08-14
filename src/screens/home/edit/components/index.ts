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
const PostEditComponents = {
  DoneButton,
};

export default PostEditComponents;
