import React from "react";
import styled from "styled-components";

import Header from "./Header";

import GlobalStyle from "./GlobalStyles";
import Nearest from "./Nearest";
import Custom from "./Custom";

import Sky from "../images/sky.jpg";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  position: relative;
  background: url(${Sky}) no-repeat center center/cover;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    right: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const App = () => {
  return (
    <Router>
      <Container>
        <Route path='/' exact component={Nearest} />
        <Route path='/custom' exact component={Custom} />
        <GlobalStyle img={Sky} />
        <Header />
      </Container>
    </Router>
  );
};

export default App;
