import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next';
// If imports are used in any server side function, those imports are stripped from client side code they, only run during build (getStaticProps) time or when the page is accessed (getServerSideProps), just like fs import
import fs from 'fs/promises';
import path from 'path';

import type { Products } from 'types/product';
import Link from 'next/link';

// This runs on build time, not on the fly, but getServerSideProps runs on the the fly, not build time
export async function getStaticProps(context: GetStaticPropsContext) {
  // This function should always return an object that contains props property, this props object will become props object of Page component that will be exported default from this module

  // We need to tell path.join from where to start in the first argument (that is the current working directory)
  // Second argument is where the file (to be executed) exist with respect to the process.cwd, and the Third argument is the folder
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // process.cwd: current working directory will not be the pages folder, because this is a server side function that will be executed by next js, so the current working directory will be product root folder
  const dataJson = await fs.readFile(filePath, 'utf-8');

  const data = JSON.parse(dataJson);
  const products: Products = data.products;

  if (!data) {
    return {
      props: { products: [] },
      // redirect: it allows the user to redirect to another route, set the path of route on destination property
      redirect: {
        destination: '/no-data',
      },
    };
  }

  return {
    props: {
      products: products,
    },
    // If we don't add revalidate, next js will go for Static Site Generation (SSG)
    // If we add revalidate next js will go for Incremental Static Generation (ISG)
    // Incremental Static Generation: It means next js should pre build page when the time we set in the revalidate (after it built the page first time when we run the next build command)
    // For development, page will be regenerated for every request
    // This number should be in seconds
    revalidate: 600, // 10 minutes
    // If "notFound" is true, it will return a 404 error (renders 404 error page)
    notFound: products.length <= 0,
  };
}

// We can "InferGetStaticProps" both in NextPage or after props object
const HomePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  const { products } = props;

  // When we navigate through "Link" component from next/router, request is not made to the server for the new page, but the data is come from .json file, that is fetched from the server by next js, we don't have worry about the data fetching done by Link component

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
