import { NextApiRequest, NextApiResponse } from 'next';
import { TodoType } from 'typings/todo';
import { promises as fs } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todos = await new Promise<TodoType[]>((resolve, reject) => {
        // readFile은 비동기 함수이므로 Promise를 이용해 파일 로딩을 대기
        fs.readFile('data/todos.json')
          .then((data) => {
            // Buffer 타입이므로 string 타입으로 변환
            const todosData = data.toString();
            if (!todosData) return resolve([]);
            const result = JSON.parse(todosData);
            return resolve(result);
          })
          .catch((err: Error) => reject(err.message));
      });

      res.statusCode = 200;
      return res.send(todos);
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
