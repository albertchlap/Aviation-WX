import { createGlobalStyle } from "styled-components";
import Sky from "../images/sky-2.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url(${Sky}) no-repeat center center/cover;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export default GlobalStyle;
