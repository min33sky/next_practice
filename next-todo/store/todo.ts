import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../types/todo.d';

interface TodoReduxState {
  todos: TodoType[];
}

const initialState: TodoReduxState = {
  todos: [],
};

const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // 투두 변경하기
    setTodo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = { ...todo.actions };

export default todo;
