import React, { useState } from "react";
import SearchBar from "./SearchBar";
import GridContainer from "./GridContainer";
import styled from "styled-components";
import Legend from "./Legend";

const Custom = () => {
  const [ident, setIdent] = useState("");

  return (
    <Container>
      <Title>Custom Search</Title>
      <Legend />
      <SearchBar setIdent={setIdent} />
      <GridContainer ident={ident} />
    </Container>
  );
};

export default Custom;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  opacity: 0.7;
  margin: 90px 0 30px;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 500px) {
    padding-top: 40px;
  }
`;
