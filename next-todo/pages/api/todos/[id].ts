import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const todoId = Number(req.query.id);
      const isExisted = Data.todo.exist({ id: todoId });
      if (!isExisted) {
        res.statusCode = 404;
        res.end();
      }

      const todos = await Data.todo.getList();
      const changedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      });

      Data.todo.write(changedTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  } else if (req.method === 'DELETE') {
    try {
      const todoId = Number(req.query.id);
      const existedTodo = Data.todo.exist({ id: todoId });
      if (!existedTodo) {
        return res.status(404).end();
      }
      const todos = Data.todo.getList();
      const filteredTodos = todos.filter((todo) => todo.id !== todoId);
      Data.todo.write(filteredTodos);
      return res.status(200).end();
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  res.statusCode = 405;
  return res.end();
};
