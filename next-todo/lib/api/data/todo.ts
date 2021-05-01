import { promises as fs, writeFileSync } from 'fs';
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

/**
 * 해당 아이디의 투두의 존재 여부
 * @param param0
 * @returns
 */
const exists = async ({ id }: { id: number }) => {
  const todos = await getList();
  return todos.some((todo) => todo.id === id);
};

/**
 * 투두 리스트 저장하기
 * @param todos
 */
const write = (todos: TodoType[]) => {
  writeFileSync('data/todos.json', JSON.stringify(todos));
};

export default {
  getList,
  exists,
  write,
};
