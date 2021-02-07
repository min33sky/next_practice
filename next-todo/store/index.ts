import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import todo from './todo';
// import {
//   TypedUseSelectorHook,
//   useSelector as useReduxSelector,
// } from 'react-redux';

/**
 *? Next에 redux 적용하기
 * https://github.com/vercel/next.js/tree/canary/examples/with-redux-wrapper
 */

// 각각의 리듀서들을 하나로 모은다.
const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  // ? __NEXT_REDUX_WRAPPER_HYDRATE__ 리듀서를 추가
  // ? Hydrate는 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용 할 수있도록 전달하는 역할
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // ? use previous state
      ...action.payload, // ? apply delta from hydration
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// ? RootState 타입을 미리 지정: useSelector를 커스터마이즈해서 사용
// export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// ? 위 코드 대신 react-redux 모듈을 재정의해서 사용하는 방법
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends RootState {} //* RootState를 상속하는 코드 추가
}

export const wrapper = createWrapper(initStore);
