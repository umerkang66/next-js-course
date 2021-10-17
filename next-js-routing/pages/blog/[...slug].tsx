import { useRouter } from 'next/dist/client/router';

const BlogPostPage = () => {
  const router = useRouter();
  console.log(router.query);

  return <div>Blog Post page</div>;
};

export default BlogPostPage;
