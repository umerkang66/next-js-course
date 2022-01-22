import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventId } = req.query;
  if (typeof eventId !== 'string') return;

  const client = await MongoClient.connect(
    `mongodb+srv://ugulzar4512:ugulzar4512@cluster0.hp6lx.mongodb.net/events?retryWrites=true&w=majority`
  );

  if (req.method === 'POST') {
    // Add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      return res.status(422).json({
        status: 'fail',
        message: 'Invalid Input',
      });
    }

    interface NewComment {
      id: any;
      email: string;
      name: string;
      text: string;
      eventId: string;
    }

    const newComment: NewComment = { email, name, text, eventId, id: '' };

    // Store in the database
    const database = client.db();
    const commentsCollection = database.collection('comments');

    const result = await commentsCollection.insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({
      status: 'success',
      data: newComment,
    });
  }

  if (req.method === 'GET') {
    const database = client.db();
    const commentsCollection = database.collection('comments');

    const comments = await commentsCollection
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({
      status: 'success',
      data: comments,
    });
  }

  client.close();
}

export default handler;
