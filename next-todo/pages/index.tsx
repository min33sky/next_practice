import TodoList from 'components/TodoList';
import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { getTodosAPI } from 'lib/api/todo';
import { wrapper } from 'store';
import { todoActions } from 'store/todo';

const StartPage: NextPage = () => {
  return <TodoList />;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const { data } = await getTodosAPI();

      // 스토어 업데이트
      store.dispatch(todoActions.setTodo(data));

      return {
        props: {},
      };
    } catch (error) {
      console.error(error);
      return {
        props: {},
      };
    }
  }
);

export default StartPage;
