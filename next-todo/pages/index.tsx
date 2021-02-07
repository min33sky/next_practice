import { NextPage } from 'next';
import TodoList from '../components/TodoList';
import { getTodosAPI } from '../lib/api/todo';
import { wrapper } from '../store';
import { todoActions } from '../store/todo';
import { TodoType } from '../types/todo';

interface IProps {
  todos: TodoType[];
}

/**
 * 시작 페이지
 */
const index: NextPage<IProps> = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL, '클라이언트');
  return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    console.log(store);
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data)); //* 스토어 업데이트
      return {
        props: {},
      };
    } catch (error) {
      console.log(error);
      return {
        props: {},
      };
    }
  }
);

export default index;
