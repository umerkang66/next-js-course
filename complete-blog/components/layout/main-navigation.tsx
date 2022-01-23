import Link from 'next/link';
import classes from './main-navigation.module.css';

import Logo from './logo';
import { FC } from 'react';

const MainNavigation: FC = props => {
  return (
    // If the children of Link is not text (it could be a component), the Link will not add the anchor tag by itself, but we have to add it manually
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
