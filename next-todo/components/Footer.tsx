import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.div`
  width: 100%;
  height: 53px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${palette.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  button {
    font-size: 32px;
    width: 32px;
    height: 32px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    line-height: 0;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: tomato;
      border: 1px solid tomato;
      color: white;
    }
  }
`;

/**
 * Footer Component
 */
export default function Footer() {
  const router = useRouter();
  const isMain = router.pathname === '/';

  return (
    <Container className="container">
      <button
        type="button"
        onClick={() => router.push(isMain ? '/todo/add' : '/')}
      >
        {isMain ? '+' : '＜'}
      </button>
    </Container>
  );
}
