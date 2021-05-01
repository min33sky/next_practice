import React, { useMemo } from 'react';
import { checkTodoAPI, deleteTodoAPI } from 'lib/api/todo';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from 'store/todo';
import TrashCanIcon from '../../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../../public/statics/svg/check_mark.svg';
import { Container } from './style';

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
        colors[`${todo.color}`] = 1;
      } else {
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  const onClickCheckTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      const newTodos = todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              checked: !todo.checked,
            }
          : todo
      );
      dispatch(todoActions.setTodo(newTodos));
      console.log('체크하였습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDeleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      dispatch(todoActions.setTodo(newTodos));
      console.log('삭제 완료');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          님은 TODO<span>{todos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p className={`todo-text ${todo.checked && 'checked-todo-text'}`}>
                {todo.text}
              </p>
            </div>

            <div className="todo-right-side">
              {!todo.checked && (
                <button
                  type="button"
                  className="todo-button"
                  onClick={() => onClickCheckTodo(todo.id)}
                >
                  &nbsp;
                </button>
              )}
              {todo.checked && (
                <>
                  <TrashCanIcon
                    className="todo-trash-can"
                    onClick={() => onClickDeleteTodo(todo.id)}
                  />
                  <CheckMarkIcon
                    className="todo-check-mark"
                    onClick={() => onClickCheckTodo(todo.id)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
