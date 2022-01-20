import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { Fragment } from 'react';

import type { Products } from 'types/product';
import { getData } from 'hooks/get-data';

// For dynamic page, next js won't pre build the page, because ids (pageIds) may be too much, but they are generated on the fly (just on time) on the server, but getStaticProps tries to generate the pages on the build time, so we get an error, to avoid this issue we have getStaticPaths function provided by next
export async function getStaticProps(context: GetStaticPropsContext) {
  // In the "getStaticProps" function we cannot use the "useRouter", but the params are provided by params property from context
  // Context is provided as argument in the getStaticProps function
  const { params } = context;

  const data = await getData();

  const products: Products = data.products;
  const product = products.find(product => product.id === params?.productId);

  if (!product) {
    return {
      props: {
        product: undefined,
      },
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

// By getStaticPaths function we can tell next js which instances of a dynamic page (paths) should be pre-built during the build process
export async function getStaticPaths() {
  // We have to return paths array from an object, and that array should contain an object (or multiple objects if multiple pages should be rendered in advanced) that should contain params key
  // In the params object, there should be the dynamic key: value pair, key come from file (module) name, value is the id (url) through which fetch some data
  const data = await getData();
  const products: Products = data.products;

  // Generate paths dynamically, that contains paths array, that has multiple objects with params key (that is object), and that has "productId" key, with value of "id" itself
  const pathsParam = products.map(product => ({
    params: { productId: product.id },
  }));

  return {
    paths: pathsParam,
    /* 
    paths: [
      { params: { productId: 'p1' } },
      { params: { productId: 'p2' } },
      { params: { productId: 'p3' } },
    ], 
    */
    // We can pre-render some pages, and set the fallback to true, so the other pages would be build on the fly (on the server), now we have only three pages, so i just pre-built all the pages, but if we have more pages, pre-building is not optimal, so then we set fallback to true
    fallback: true, // We are generating all the pages
    // We can also set the fallback to string 'blocking' by doing that, we don't have to check if the product is undefined in the component, page will automatically wait for the data to arrive (hence no error will occur)
  };
}

const ProductDetailPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  const { product } = props;
  if (!product) return <p>Loading...</p>;

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

export default ProductDetailPage;
