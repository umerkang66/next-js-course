import type { NextPage, InferGetStaticPropsType } from 'next';
// If imports are used in any server side function, those imports are stripped from client side code they, only run during build (getStaticProps) time or when the page is accessed (getServerSideProps), just like fs import
import fs from 'fs/promises';
import path from 'path';

import { Products } from 'types/Product';

// This runs on build time, not on the fly, but getServerSideProps runs on the the fly, not build time
export async function getStaticProps() {
  // This function should always return an object that contains props property, this props object will become props object of Page component that will be exported default from this module

  // We need to tell path.join from where to start in the first argument (that is the current working directory)
  // Second argument is where the file (to be executed) exist with respect to the process.cwd, and the Third argument is the folder
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // process.cwd: current working directory will not be the pages folder, because this is a server side function that will be executed by next js, so the current working directory will be product root folder
  const dataJson = await fs.readFile(filePath, 'utf-8');

  const data = JSON.parse(dataJson);
  const products: Products = data.products;

  return {
    props: {
      products: products,
    },
    // If we don't add revalidate, next js will go for Static Site Generation (SSG)
    // If we add revalidate next js will go for Incremental Static Generation (ISG)
    // Incremental Static Generation: It means next js should pre build page when the time we set in the revalidate (after it built the page first time when we run the next build command)
    // This number should be in seconds
    revalidate: 600, // 10 minutes
    // For development, page will be regenerated for every request
  };
}

// We can "InferGetStaticProps" both in NextPage or after props object
const HomePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  const { products } = props;

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
