import Data from 'lib/api/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const todoId = Number(req.query.id);
      const exists = Data.todo.exists({ id: todoId });
      if (!exists) {
        res.statusCode = 404;
        res.end();
      }

      // 해당 투두 아이템이 존재한다면 변경하기
      const todos = await Data.todo.getList();
      const changedTodos = todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              checked: !todo.checked,
            }
          : todo
      );

      Data.todo.write(changedTodos);

      return res.status(200).end();
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
