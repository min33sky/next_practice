import React, { useEffect } from 'react';
import Header from '../components/Header';

/**
 *
 * @param {import('react').ReactNode} Component pages에 페이지들
 * @param {object} pageProps ssr 메서드에서 페이지로 전달하는 props
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style>
    </>
  );
}
