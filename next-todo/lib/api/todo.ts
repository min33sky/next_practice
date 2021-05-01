import { TodoType } from 'typings/todo';
import fetch from '.';

// Todolist fetch API
export const getTodosAPI = () => fetch.get<TodoType[]>('/api/todos');

// Todo Check
export const checkTodoAPI = (id: number) => fetch.patch(`/api/todos/${id}`);

interface AddTodoAPIBody {
  text: string;
  color: TodoType['color'];
}

// Add Todo
export const addTodoAPI = (body: AddTodoAPIBody) =>
  fetch.post('/api/todos', body);

// Remove Todo
export const deleteTodoAPI = (id: number) => fetch.delete(`/api/todos/${id}`);
