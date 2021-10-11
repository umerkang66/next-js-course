import fs from 'fs/promises';
import path from 'path';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
}

interface Data {
  products: Product[];
}

const getData = async (): Promise<Data> => {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data: Data = JSON.parse(jsonData);

  return data;
};

// It pre-renders all the pages at the build time
export async function getStaticPaths() {
  const data = await getData();

  const paramsWithIds = data.products.map(product => ({
    params: { pid: product.id },
  }));

  return {
    paths: paramsWithIds,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const productId = params?.pid;
  const data = await getData();
  let notFound = false;

  const product = data.products.find(product => product.id === productId);
  if (!product) notFound = true;

  return {
    props: {
      loadedProduct: product,
    },
    notFound,
  };
}

function ProductDetailPage({
  loadedProduct,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!loadedProduct) return null;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export default ProductDetailPage;
