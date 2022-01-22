import fs from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = await fs.readFile(filePath, 'utf-8');

  const data = JSON.parse(fileData);
  return data;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = { id: new Date().toISOString(), email, feedback };

    const filePath = path.join(process.cwd(), 'data', 'feedback.json');

    const data = await getData();
    data.push(newFeedback);

    await fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).json({
      status: 'success',
    });
  }

  if (req.method === 'GET') {
    const data = await getData();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}

export default handler;
