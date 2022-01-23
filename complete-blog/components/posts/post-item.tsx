import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';

import { Post } from '../../types/post';

interface PostItemProps {
  post: Post;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const { date, image, slug, title, excerpt } = post;

  return (
    <li className={classes.post}>
      <Link href="">
        <a>
          <div className={classes.image}>
            <Image src="" alt="" />
          </div>
          <div className={classes.content}>
            <h3>TITLE</h3>
            <time>July 13th 2022</time>
            <p>The Expect</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
