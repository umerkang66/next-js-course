import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const userId = params?.userId;

  return {
    props: {
      id: 'userId-' + userId,
    },
  };
}

const UserIdPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  return <h1>{props.id}</h1>;
};

export default UserIdPage;
