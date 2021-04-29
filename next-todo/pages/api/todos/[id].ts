import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      console.log(req.query);
      res.statusCode = 200;
      return res.end();
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
