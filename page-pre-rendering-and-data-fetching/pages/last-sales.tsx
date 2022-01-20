import type { InferGetStaticPropsType, NextPage } from 'next';
import { useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';

import type { Sales } from 'types/sale';
import { getUrl } from 'hooks/get-url';

// In this component, we are using the static site generation, and client-side fetching together, first the page will be loaded with data from getStaticProps function (that data get refreshed every 10 seconds because we have defined that in the revalidate), then after the component is loaded the latest data will be loaded by client-side fetching
export async function getStaticProps() {
  const res = await fetch(getUrl());
  const data = await res.json();
  const transformedData: Sales = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      salesFromServer: transformedData,
    },
    revalidate: 10,
  };
}

const LastSalesPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ salesFromServer }) => {
  const [sales, setSales] = useState<Sales>(salesFromServer);

  const { data, error } = useSWR(getUrl(), fetch);

  useEffect(() => {
    const getDataFromSwr = async () => {
      const convertedData = await data?.json();
      const transformedData: Sales = [];

      for (const key in convertedData) {
        transformedData.push({
          id: key,
          username: convertedData[key].username,
          volume: convertedData[key].volume,
        });
      }

      setSales(transformedData);
    };

    getDataFromSwr();
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!sales.length) return <div>No Data Found</div>;

  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
