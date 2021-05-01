import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import todo from './todo';

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  // ? "__NEXT_REDUX_WRAPPER_HYDRATE__" 리듀서 추가
  // ? Hydrate: 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달해주는 역할
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  return rootReducer(state, action);
};

// ? 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

// ? RootState 타입 지원 (현재 스토어의 타입으로 확장하기)
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends RootState {}
}

const initStore = () => {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const wrapper = createWrapper(initStore);
