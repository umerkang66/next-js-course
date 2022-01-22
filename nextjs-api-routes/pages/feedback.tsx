import { InferGetServerSidePropsType, NextPage } from 'next';
import { useState } from 'react';
import { getData } from './api/feedback/feedback';

interface ResObj {
  id: string;
  email: string;
  feedback: string;
}

export async function getServerSideProps() {
  const data: ResObj[] = await getData();

  return {
    props: {
      data,
    },
  };
}

const Feedback: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const [details, setDetails] = useState<ResObj | null>(null);

  const showDetails = async (id: string) => {
    const res = await fetch(`/api/feedback/${id}`);
    const dataReq = await res.json();
    const data: ResObj = dataReq.data;

    setDetails(data);
  };

  const renderData = () => {
    return data.length
      ? data.map(feedback => (
          <div key={feedback.id}>
            <h3>FEEDBACK: {feedback.feedback}</h3>
            <button onClick={showDetails.bind(null, feedback.id)}>
              Show Details
            </button>
            <div>--------------------------------------</div>
          </div>
        ))
      : null;
  };

  return (
    <div>
      {renderData()}
      {details ? (
        <div>
          <h6>ID: {details.id}</h6>
          <h6>EMAIL: {details.email}</h6>
        </div>
      ) : null}
    </div>
  );
};

export default Feedback;
