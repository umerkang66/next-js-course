import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const PortfolioProjectPage: NextPage = () => {
  const router = useRouter();
  console.log(router.query.id);

  return <div>This is portfolioProjectPage page</div>;
};

export default PortfolioProjectPage;
