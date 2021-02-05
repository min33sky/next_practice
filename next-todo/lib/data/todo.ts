import { readFileSync, writeFileSync } from 'fs';
import { TodoType } from '../../types/todo';

/**
 *? 데이터 조작 함수들 모음
 */

//* 투두 리스트 가져오기
const getList = () => {
  const todosBuffer = readFileSync('data/todos.json');
  const todosString = todosBuffer.toString(); // buffer -> string
  if (!todosString) {
    return [];
  }
  const todos: TodoType[] = JSON.parse(todosString); // JSON 객체를 일반 객체로 파싱
  return todos;
};

//* id의 투두가 있는지 확인하기
const exist = ({ id }: { id: number }) => {
  const todos = getList();
  const result = todos.some((todo) => todo.id === id); // ? some() : 하나라도 존재하면 true
  return result;
};

//* 투두리스트 저장하기
const write = async (todos: TodoType[]) => {
  writeFileSync('data/todos.json', JSON.stringify(todos));
};

export default { getList, exist, write };
