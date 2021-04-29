import { promises as fs } from 'fs';
import { TodoType } from 'typings/todo';

// 투두 리스트 데이터 불러오기
const getList = async () => {
  try {
    const todos = new Promise<TodoType[]>((resolve, reject) => {
      fs.readFile('data/todos.json')
        .then((data) => {
          const todosData = data.toString();
          if (!todosData) resolve([]);
          const result = JSON.parse(todosData);
          return resolve(result);
        })
        .catch((error: Error) => {
          return reject(error.message);
        });
    });

    return todos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default {
  getList,
};
