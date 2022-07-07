import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  color: #2c3f3b;
  font-family: Helvetica, sans-serif;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
`;

export default GlobalStyle;
