import React, { useMemo } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../public/statics/svg/check_mark.svg';

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

interface IProps {
  todos: TodoType[];
}

//* 객체의 문자열 인덱스 사용을 위한 타입
type ObjectIndexType = {
  [key: string]: number | undefined;
};

export default function TodoList({ todos }: IProps) {
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
              {todo.checked && (
                <>
                  <TrashCanIcon className="todo-trash-can" />
                  <CheckMarkIcon className="todo-check-mark" />
                </>
              )}
              {!todo.checked && <CheckButton checked={todo.checked} />}
            </TodoRightSide>
          </TodoItemWrapper>
        ))}
      </ul>
    </Container>
  );
}
