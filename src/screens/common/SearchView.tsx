import { ChangeEventHandler, FC, PropsWithChildren } from 'react';
import Header from 'components/header';
import HeaderLeft from 'components/header/HeaderLeft';
import Layout from 'components/layout/Layout';

export interface SearchViewProps {
  onBackClick: VoidFunction;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchView: FC<PropsWithChildren<SearchViewProps>> = ({
  onBackClick,
  children,
  onChange,
  value,
}) => (
  <Layout fullWidth>
    <Header>
      <HeaderLeft iconType="back" onClick={onBackClick} />
      <Header.Input type="text" value={value} onChange={onChange} />
    </Header>
    {children}
  </Layout>
);

export default SearchView;
