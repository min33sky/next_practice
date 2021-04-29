import TodoList from 'components/TodoList';
import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { TodoType } from 'typings/todo';
import { getTodosAPI } from 'lib/api/todo';

interface IProps {
  todos: TodoType[];
}

const StartPage: NextPage<IProps> = ({ todos }) => {
  console.log(process.env.NEXT_PUBLIC_API_URL, '클라이언트');
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log(process.env, '서버');
    const { data } = await getTodosAPI();
    console.log(data);
    return {
      props: {
        todos: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        todos: [],
      },
    };
  }
};

export default StartPage;
