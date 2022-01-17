import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';
import classes from './button.module.css';

interface ButtonProps {
  link?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, link, onClick }) => {
  if (link) {
    return (
      // IF we do add an anchor tag Link component automatically render an anchor tag, if we add our anchor tag, Link component will detect that there is an anchor tag we specified it will render this, and add the same functionality to this anchor tag, we have to do this if we have to give our own styling, we don't have to set the "href" property that will be set automatically by Link component
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
