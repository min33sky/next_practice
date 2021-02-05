import { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

/**
 * APP의 전체 레이아웃
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
