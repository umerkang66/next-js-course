import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;
  const userId = params?.uid;

  return {
    props: {
      id: userId,
    },
  };
}

function UserIdPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{id}</div>;
}

export default UserIdPage;
