import styled from 'styled-components';
import { FC, FormEventHandler, PropsWithChildren } from 'react';
import Header from 'components/header';
import HeaderLeft from 'components/header/HeaderLeft';
import Layout from 'components/layout/Layout';

const SubmitButton = styled.input`
  width: 10vw;
  height: 10vw;
  min-height: 35px;
  max-height: 40px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.main};
  border: 0 none;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;

export interface SearchViewProps {
  onBackClick: VoidFunction;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  placeholder?: string;
}

const SearchView: FC<PropsWithChildren<SearchViewProps>> = ({
  onBackClick,
  children,
  onSubmit,
  placeholder,
}) => (
  <Layout fullWidth>
    <form onSubmit={onSubmit}>
      <Header>
        <HeaderLeft iconType="back" onClick={onBackClick} />
        <Header.Input type="text" name="keyword" placeholder={placeholder} />
        <Header.Right>
          <SubmitButton type="submit" value="검색" />
        </Header.Right>
      </Header>
    </form>
    {children}
  </Layout>
);

export default SearchView;
