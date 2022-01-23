import Image from 'next/image';
import { FC } from 'react';

import classes from './hero.module.css';

const Hero: FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="An Image showing Max"
          width={300}
          height={300}
        ></Image>
      </div>
      <h1>HI, I&apos;m Max</h1>
      <p>
        I Blog about web development - especially mainly about full-stack
        JavaScript ecosystem
      </p>
    </section>
  );
};

export default Hero;
