import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// This will be refer to all the clients of the client that will be mentioned in the value of [id] folder
const ClientProjects: NextPage = () => {
  const router = useRouter();
  // This is a index.tsx file of [clientId] folder, so router.query should be appoint to whatever we specify the path of [clientId]
  const { projectsOfClientId } = router.query;
  // Here "projectsOfClientId" is the name of the client whose multiple projects are shown in this page

  const handleOnClick = () => {
    // router.push(`/clients/${projectsOfClientId}/projectA`);
    // We can also pass objects in router.push method
    router.push({
      pathname: '/clients/[projectsOfClientId]/[clientProjectId]',
      // Here are setting that the first dynamic path remains the same but second changes
      query: {
        projectsOfClientId,
        clientProjectId: 'projectA',
      },
    });
  };

  return (
    <div>
      <h1>These are the projects of client: {projectsOfClientId}</h1>
      <button onClick={handleOnClick}>
        <h3>Load Project A</h3>
      </button>
    </div>
  );
};

export default ClientProjects;
