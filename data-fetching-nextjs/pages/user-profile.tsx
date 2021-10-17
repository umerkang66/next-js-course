import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'umerkang',
    },
  };
}

function UserProfilePage({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{username}</div>;
}

export default UserProfilePage;
