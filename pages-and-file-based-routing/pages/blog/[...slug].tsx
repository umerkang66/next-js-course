import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const BlogPostPage: NextPage = () => {
  const router = useRouter();
  // Here the router.query will have a property that is the array of slug (slug is the name of the property because the name of this file is [...slug])
  // The slug is will SPLIT the url string by "/" and convert it into an array (2022/01 will return an array of ["2022", "01"], and similarly user/firstBlog will return an array of ["user", "firstBlog"])
  const { slug } = router.query;

  return (
    <div>
      {slug instanceof Array &&
        slug.map((slugEl, i) => {
          return <h1 key={i + 1}>{slugEl}</h1>;
        })}
    </div>
  );
};

export default BlogPostPage;
