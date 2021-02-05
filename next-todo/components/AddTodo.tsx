import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AddTodoAPI } from '../lib/api/todo';
import BrushIcon from '../public/statics/svg/brush.svg';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';

const Container = styled.div`
  padding: 16px;

  /* 투두 작성 textarea  */
  textarea {
    width: 100%;
    border-radius: 5px;
    height: 300px;
    border-color: ${palette.gray};
    margin-top: 12px;
    resize: none;
    outline: none;
    padding: 12px;
    font-size: 16px;
  }
`;

const AddTodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 21px;
  }

  /* 투두 추가 버튼 */
  button {
    padding: 4px 8px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    outline: none;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: tomato;
      border: 1px solid tomato;
      color: white;
    }
  }
`;

const ColorWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const ColorList = styled.div`
  display: flex;
`;

const ColorSelectButton = styled.button<{ selected: TodoType['color'] }>`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  border: ${(props) =>
    props.color === props.selected ? '2px solid black' : 0};
  outline: 0;
  border-radius: 50%;
  &:last-child {
    margin: 0;
  }
  background-color: ${(props) => props.color || 'black'};
  cursor: pointer;
`;

/**
 * 투두 추가 컴포넌트
 */
export default function AddTodo() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState<TodoType['color']>('red');

  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert('색상과 할 일을 입력해주세요.');
        return;
      }
      await AddTodoAPI({ text, color: selectedColor });
      console.log('추가했습니다.');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="container">
      <AddTodoHeader>
        <h1>AddTodo</h1>
        <button type="button" onClick={addTodo}>
          추가하기
        </button>
      </AddTodoHeader>

      <ColorWrapper>
        <ColorList>
          {['red', 'orange', 'yellow', 'green', 'blue', 'navy'].map(
            (color, index) => (
              <ColorSelectButton
                key={index}
                color={color}
                selected={selectedColor}
                onClick={() => setSelectedColor(color as TodoType['color'])}
              />
            )
          )}
        </ColorList>
        <BrushIcon />
      </ColorWrapper>

      <textarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="할 일을 입력해주세요"
      />
    </Container>
  );
}
