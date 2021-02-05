import { NextApiRequest, NextApiResponse } from 'next';
import { TodoType } from '../../../types/todo.d';
import Data from '../../../lib/data';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todos = Data.todo.getList();
      res.statusCode = 200;
      return res.send(todos);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  } else if (req.method === 'POST') {
    // 값을 받았는지 확인
    const { text, color } = req.body;
    if (!text || !color) {
      return res.status(400).send('text 혹은 color가 없습니다.');
    }

    const todos = Data.todo.getList();
    let todoId: number;
    if (todos.length > 0) {
      // 마지막 투두 id + 1
      todoId = todos[todos.length - 1].id + 1;
    } else {
      todoId = 1;
    }

    const newTodo: TodoType = {
      id: todoId,
      text,
      color,
      checked: false,
    };

    Data.todo.write([...todos, newTodo]);
    return res.status(200).end();
  }
};
