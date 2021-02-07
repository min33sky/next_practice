import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../public/statics/svg/check_mark.svg';
import { checkTodoAPI, deleteTodoAPI } from '../lib/api/todo';
import { RootState } from '../store';
import { todoActions } from '../store/todo';

const Container = styled.div`
  width: 100%;
`;

const TodoHeader = styled.div`
  position: relative;
  padding: 12px;
  border-bottom: 1px solid ${palette.gray};

  & > p {
    font-size: 14px;
    span {
      margin-left: 8px;
    }
  }

  & > div {
    display: flex;
  }
`;

const TodoListHeaderColorsNum = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 8px;

  & > p {
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    margin-left: 6px;
  }
`;

const TodoCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color || 'red'};
`;

const TodoItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid ${palette.gray};
`;

// ? 임의의 props를 설정했을 경우 아래와 같이 제네릭에 타입 지정
const TodoItem = styled.div<{ checked: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  & > div {
    width: 12px;
    height: 100%;
    background-color: ${(props) => props.color};
  }

  & > p {
    color: ${(props) => props.checked && palette.gray};
    text-decoration: ${(props) => props.checked && 'line-through'};
    margin-left: 12px;
    font-size: 16px;
  }
`;

const TodoRightSide = styled.div`
  display: flex;
  margin-right: 12px;

  svg {
    &:first-child {
      margin-right: 16px;
    }
    cursor: pointer;
  }

  & > .todo-trash-can {
    width: 24px;
    path {
      fill: ${palette.deep_red};
    }
  }

  & > .todo-check-mark {
    fill: ${palette.deep_green};
  }
`;

const CheckButton = styled.button<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${palette.gray};
  background-color: transparent;
  outline: none;
  cursor: pointer;
`;

//* 객체의 문자열 인덱스 사용을 위한 타입
type ObjectIndexType = {
  [key: string]: number | undefined;
};

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    todos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        // 키가 존재하지 않으면
        colors[`${todo.color}`] = 1;
      } else {
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      console.log('체크하였습니다.');
      // router.reload();
      // router.push('/');
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      });
      dispatch(todoActions.setTodo(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      dispatch(todoActions.setTodo(newTodos));
      console.log('삭제했습니다.', newTodos.length, todos.length);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <TodoHeader>
        <p>
          남은 TODO<span>{todos.length}개</span>
        </p>
        <div>
          {Object.keys(todoColorNums).map((color, index) => (
            <TodoListHeaderColorsNum key={index}>
              <TodoCircle color={color} />
              <p>{todoColorNums[color]}개</p>
            </TodoListHeaderColorsNum>
          ))}
        </div>
      </TodoHeader>

      <ul>
        {todos.map((todo) => (
          <TodoItemWrapper key={todo.id}>
            <TodoItem checked={todo.checked} color={todo.color}>
              <div />
              <p>{todo.text}</p>
            </TodoItem>

            <TodoRightSide>
              {
                // 체크 했을 때
                todo.checked && (
                  <>
                    <TrashCanIcon
                      className="todo-trash-can"
                      onClick={() => deleteTodo(todo.id)}
                    />
                    <CheckMarkIcon
                      className="todo-check-mark"
                      onClick={() => checkTodo(todo.id)}
                    />
                  </>
                )
              }
              {
                // 체크하지 않알을 때
                !todo.checked && (
                  <CheckButton
                    checked={todo.checked}
                    onClick={() => checkTodo(todo.id)}
                  />
                )
              }
            </TodoRightSide>
          </TodoItemWrapper>
        ))}
      </ul>
    </Container>
  );
}
