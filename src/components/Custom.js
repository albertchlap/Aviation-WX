import React from "react";
import SearchBar from "./SearchBar";
import GridContainer from "./GridContainer";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  color: #fff;
  opacity: 0.7;
  margin: 120px 0 50px;
  width: 100%;
  text-align: center;
`;

const Custom = ({ aerodrome, deleteAirport, submitHandler, metar, taf }) => {
  return (
    <Container>
      <Title>Custom Search</Title>
      <SearchBar submitHandler={submitHandler} />
      <GridContainer
        aerodrome={aerodrome}
        deleteAirport={deleteAirport}
        metar={metar}
        taf={taf}
      />
    </Container>
  );
};

export default Custom;
