import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email: string = req.body.email;

    if (!email || !email.includes('@')) {
      return res.status(422).json({
        status: 'fail',
        message: 'Invalid email address',
      });
    }

    const client = await MongoClient.connect(
      `mongodb+srv://ugulzar4512:ugulzar4512@cluster0.hp6lx.mongodb.net/events?retryWrites=true&w=majority`
    );

    const database = client.db();
    const newsletterCollection = database.collection('newsletter');

    await newsletterCollection.insertOne({ email });

    client.close();

    res.status(201).json({
      status: 'success',
      message: 'Signed up!',
    });
  }
}

export default handler;
