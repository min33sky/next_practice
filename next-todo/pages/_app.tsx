import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import Header from 'components/Header';
import GlobalStyle from 'styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
