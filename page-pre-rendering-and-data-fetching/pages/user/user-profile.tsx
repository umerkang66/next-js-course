import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

// This function will not run when the project is built, but at the every server request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // We can use params: if we have dynamic page
  const { params, req, res } = context;

  // We get the req, res objects, by this we can manipulate res by adding headers, or adding a cookie, we don't worry about res here, because next js will send it for us, this rendered component
  // We can also read the data from req object for example headers or cookie for example, for stuff like authentication

  // The return structure should be same as getStaticProps, it should have "notFound" key, and it can have a "redirect" key, not revalidate key
  return {
    props: {
      user: {
        username: 'umer',
        password: 'umer',
      },
    },
  };
}

const UserProfilePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  const { user } = props;

  return (
    <div>
      <h1>{user.username}</h1>
      <h1>{user.password}</h1>
    </div>
  );
};

export default UserProfilePage;
