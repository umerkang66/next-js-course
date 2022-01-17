import Link from 'next/link';
import { FC } from 'react';
import classes from './button.module.css';

interface ButtonProps {
  link: string;
}

const Button: FC<ButtonProps> = ({ children, link }) => {
  return (
    // IF we do add an anchor tag Link component automatically render an anchor tag, if we add our anchor tag, Link component will detect that there is an anchor tag we specified it will render this, and add the same functionality to this anchor tag, we have to do this if we have to give our own styling, we don't have to set the "href" property that will be set automatically by Link component
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

export default Button;
