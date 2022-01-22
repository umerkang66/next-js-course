import { FC, Fragment } from 'react';
import MainHeader from './main-header';

interface LayoutProps {}

const Layout: FC<LayoutProps> = props => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
