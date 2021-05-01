import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from 'typings/todo';

export const INIT_TODO_LIST = 'todo/INIT_TODO_LIST';

export const setTodo = (payload: TodoType[]) => {
  return {
    type: INIT_TODO_LIST,
    payload,
  };
};

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
    setTodo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = { ...todo.actions };

export default todo;
