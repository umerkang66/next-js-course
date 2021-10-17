import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const ClientProjectsPage: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  const loadProjectHandler = function () {
    router.push('/client/umer/project1');
  };

  return (
    <div>
      <div>This is ClientProjects Page</div>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
