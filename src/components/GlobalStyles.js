import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    
  }
  
`;

export default GlobalStyle;
