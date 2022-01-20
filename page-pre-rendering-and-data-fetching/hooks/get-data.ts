// These node imports will not go in the client side code bundle
import fs from 'fs/promises';
import path from 'path';

export async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // process.cwd: current working directory will not be the pages folder, because this is a server side function that will be executed by next js, so the current working directory will be product root folder
  const dataJson = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(dataJson);

  return data;
}
