import { ReactElement } from 'react';
import BottomTabNav from './BottomTabNav';

function getButtomTabLayout(page: ReactElement) {
  return (
    <>
      {page}
      <BottomTabNav />
    </>
  );
}

export { BottomTabNav, getButtomTabLayout };
