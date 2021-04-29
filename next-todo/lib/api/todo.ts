import { TodoType } from 'typings/todo';
import fetch from '.';

// Todolist fetch API
export const getTodosAPI = () => fetch.get<TodoType[]>('/api/todos');
