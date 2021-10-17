import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const ClientProjectId: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  return <div>This is ClientProjectId page</div>;
};

export default ClientProjectId;
