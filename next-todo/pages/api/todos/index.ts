import { NextApiRequest, NextApiResponse } from 'next';
import Data from 'lib/api/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todos = await Data.todo.getList();
      return res.status(200).send(todos);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.send(error);
    }
  }

  res.statusCode = 405;
  console.log(res.statusCode);
  return res.end();
};
