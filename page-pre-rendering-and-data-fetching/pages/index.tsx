import type { NextPage, InferGetStaticPropsType } from 'next';

export const getStaticProps = async () => {
  // This function should always return an object that contains props property, this props object will become props object of Page component that will be exported default from this module
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }],
    },
  };
};

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
