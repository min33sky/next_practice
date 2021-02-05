import { TodoType } from '../../types/todo.d';
import axios from '.';

/**
 *? API 호출 함수들 모음
 */

// 투두 목록 가져오기
export const getTodosAPI = () => axios.get<TodoType[]>('/api/todos');

// 투두 체크하기
export const checkTodoAPI = (id: number) => axios.patch(`/api/todos/${id}`);

// 투두 추가하기
interface AddTodoAPIBody {
  text: string;
  color: TodoType['color'];
}

export const AddTodoAPI = (body: AddTodoAPIBody) =>
  axios.post('/api/todos', body);

// 투두 삭제하기
export const deleteTodoAPI = (id: number) => axios.delete(`/api/todos/${id}`);
