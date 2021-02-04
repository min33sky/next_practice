import { readFileSync, writeFileSync } from 'fs';
import { TodoType } from '../../types/todo';

const getList = () => {
  const todosBuffer = readFileSync('data/todos.json');
  const todosString = todosBuffer.toString();
  if (!todosString) {
    return [];
  }
  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
};

//* id의 투두가 있는지 확인하기
const exist = ({ id }: { id: number }) => {
  const todos = getList();
  const result = todos.some((todo) => todo.id === id);
  return result;
};

//* 투두리스트 저장하기
const write = async (todos: TodoType[]) => {
  writeFileSync('data/todos.json', JSON.stringify(todos));
};

export default { getList, exist, write };
