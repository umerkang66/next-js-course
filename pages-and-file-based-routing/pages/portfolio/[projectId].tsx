import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const PortfolioProjectPage: NextPage = () => {
  const router = useRouter();
  // router.query has the property that is encoded in the url as the dynamic path instead of the "value" that we provided in the square brackets like ([projectId])
  // We can use this id to fetch some data from remote server or next js api server
  const { projectId } = router.query;

  return (
    <div>
      <h1>This is a page for {`"${projectId}"`}</h1>
    </div>
  );
};

export default PortfolioProjectPage;
