import { NextApiRequest, NextApiResponse } from 'next';
import { getData } from './feedback';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // If we don't check for req.method, this data would be send off to all type of requests, like GET, POST, PATCH or DELETE
  // We an access the query parameters through req.query
  const { feedbackId } = req.query;

  const allData = await getData();
  const requestedFeedback = allData.find(
    (feedback: any) => feedback.id === feedbackId
  );

  res.status(200).json({
    status: 'success',
    data: requestedFeedback,
  });
}

export default handler;
