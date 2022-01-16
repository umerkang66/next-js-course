import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// This will be refer to all the clients of the client that will be mentioned in the value of [id] folder
const ClientProject: NextPage = () => {
  const router = useRouter();

  // This is a dynamic route inside a dynamic route, a nested route, so the router object will get both dynamic values from the current dynamic route, and its parent dynamic route
  const { clientProjectId, projectsOfClientId } = router.query;

  return (
    <div>
      <h1>
        Client: {projectsOfClientId} and his project: {clientProjectId}
      </h1>
    </div>
  );
};

export default ClientProject;
