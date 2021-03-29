import React, { useState } from "react";
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
  @media screen and (max-width: 500px) {
    padding-top: 40px;
  }
`;

const Custom = () => {
  const [ident, setIdent] = useState("");

  // const deleteAirport = id => {
  //   setAerodrome(previous => previous.filter(airport => airport.icao !== id));
  //   setMetar(previous => previous.filter(wx => wx.station !== id));
  //   setTaf(previous => previous.filter(forecast => forecast.station !== id));
  // };

  return (
    <Container>
      <Title>Custom Search</Title>
      <SearchBar setIdent={setIdent} />
      <GridContainer ident={ident} />
    </Container>
  );
};

export default Custom;
