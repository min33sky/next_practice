import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

// css깂을 변수로 만들어 사용
const style = css`
  ${reset}

  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans', 'Noto Sans KR';
  }
`;

const GlobalStyle = createGlobalStyle`
  ${style}
`;

export default GlobalStyle;
