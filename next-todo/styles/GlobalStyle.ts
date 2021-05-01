import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const globalStayle = css`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: Noto Sans, Noto Sans KR;
    background-color: snow;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStayle}
`;

export default GlobalStyle;
