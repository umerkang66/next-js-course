import fs from 'fs/promises';
import path from 'path';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const dummyBackendJson = await fs.readFile(filePath, 'utf-8');
  const dummyBackend = JSON.parse(dummyBackendJson);

  const { products } = dummyBackend;

  let notFound = false;
  if (!products || !products.length) notFound = true;

  return {
    props: {
      products,
    },
    revalidate: 60,
    notFound,
  };
}

const HomePage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul>
      {products.map(({ id, title, description }: any) => {
        return (
          <li key={id}>
            <Link href={id}>{title}</Link>
            <div>{description}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default HomePage;
