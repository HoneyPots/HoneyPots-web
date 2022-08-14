import { FC } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Image from 'next/image';
import ellipsis from 'assets/images/header/ellipsis-vertical.png';
import search from 'assets/images/header/search.png';

const Container = styled.div`
  position: absolute;
  right: 16px;
`;

export interface HeaderRightWithChildrenProps {
  children: React.ReactNode;
}

export interface MenuItemType {
  onClick: VoidFunction;
  name: string;
}

export interface HeaderRightProps {
  iconType: 'ellipsis' | 'search';
  onClick?: VoidFunction;
  menuItemlist?: MenuItemType[];
}

const isChildrenType = (
  props: HeaderRightProps | HeaderRightWithChildrenProps,
): props is HeaderRightWithChildrenProps => 'children' in props;

const HeaderRight: FC<HeaderRightProps | HeaderRightWithChildrenProps> = (props) => {
  if (isChildrenType(props)) {
    const { children } = props;
    return <Container>{children}</Container>;
  }

  const { iconType, onClick, menuItemlist } = props;

  return (
    <Container>
      {iconType === 'ellipsis' ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            variant="outline"
            icon={<Image src={ellipsis} width={4} height={24} />}
            border="none"
          />
          {menuItemlist?.length && (
            <MenuList>
              {menuItemlist.map((item) => (
                <MenuItem key={item.name} onClick={item.onClick}>
                  {item.name}
                </MenuItem>
              ))}
            </MenuList>
          )}
        </Menu>
      ) : (
        <Image src={search} width={28} height={28} onClick={onClick} />
      )}
    </Container>
  );
};

export default HeaderRight;
