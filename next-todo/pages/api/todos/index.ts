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

  if (req.method === 'POST') {
    const { text, color } = req.body;
    if (!text || !color) {
      return res.status(400).send('text 혹은 color가 없습니다.');
    }

    const todos = await Data.todo.getList();
    let todoId;
    if (todos.length > 0) {
      todoId = todos[todos.length - 1].id + 1;
    } else {
      todoId = 1;
    }

    const newTodo = {
      id: todoId,
      text,
      color,
      checked: false,
    };

    Data.todo.write([...todos, newTodo]);
    return res.status(200).end();
  }

  res.statusCode = 405;
  console.log(res.statusCode);
  return res.end();
};
