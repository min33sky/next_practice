import { TodoType } from '../types/todo.d';
//* 액션타입 정의
export const INIT_TODO_LIST = 'todo/INIT_TODO_LIST';

//* 액션 생성자 정의
export const setTodo = (payload: TodoType[]) => ({
  type: INIT_TODO_LIST,
  payload,
});

export const todoActions = { setTodo };

interface TodoReduxState {
  todos: TodoType[];
}

const initialState: TodoReduxState = {
  todos: [],
};

//* 리듀서
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case INIT_TODO_LIST:
      const newState = { ...state, todos: action.payload };
      return newState;

    default:
      return state;
  }
}