import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import todo from './todo';

/**
 *? Next에 redux 적용하기
 * https://github.com/vercel/next.js/tree/canary/examples/with-redux-wrapper
 */

// 각각의 리듀서들을 하나로 모은다.
const rootReducer = combineReducers({
  todo,
});

const reducer = (state: any, action: any) => {
  // ? __NEXT_REDUX_WRAPPER_HYDRATE__ 리듀서를 추가
  // ? Hydrate는 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용 할 수있도록 전달하는 역할
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

//* 미들웨어 적용을 위한 스토어 enhance
const bindMiddleware = (middleware: any) => {
  // ? 개발 모드일때만 DevTools 작동
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

export const wrapper = createWrapper(initStore);