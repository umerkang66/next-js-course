import { FC } from 'react';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

import { Post } from '../../types/post';

interface PostGridProps {
  posts: Post[];
}

const PostsGrid: FC<PostGridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post, i) => (
        <PostItem key={i} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
