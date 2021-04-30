import { TodoType } from 'typings/todo';
import fetch from '.';

// Todolist fetch API
export const getTodosAPI = () => fetch.get<TodoType[]>('/api/todos');

// Todo Check
export const checkTodoAPI = (id: number) => fetch.patch(`/api/todos/${id}`);
