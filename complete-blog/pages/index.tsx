import type { NextPage } from 'next';
import { Fragment } from 'react';

import Hero from '../components/home-page/hero';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Hero />
    </Fragment>
  );
};

export default HomePage;
