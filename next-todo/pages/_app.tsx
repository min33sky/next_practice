import { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { wrapper } from '../store';
import GlobalStyle from '../styles/GlobalStyle';

/**
 * APP의 전체 레이아웃
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

// ? wrapper를 사용하여 Redux스토어를 전달
export default wrapper.withRedux(App);
