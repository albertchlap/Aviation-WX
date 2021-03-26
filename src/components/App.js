import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Header from "./Header";
import GridContainer from "./GridContainer";
import GlobalStyle from "./GlobalStyles";
import axios from "axios";
import Sky from "../images/sky.jpg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
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

const Title = styled.h1`
  text-align: center;
  position: relative;
  right: 30px;
  color: #fff;
  opacity: 0.7;
  letter-spacing: 2px;
  margin: 150px 0 50px;
  z-index: 3;
  background: none;
`;

const TOKEN = "nomE7jTacon8Qt_eboDH4LrKn1OQU0-nuByXV9eb6MQ";

const App = () => {
  const [metar, setMetar] = useState([]);

  const submitHandler = async query => {
    const res = await axios.get(`https://avwx.rest/api/metar/${query}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    setMetar(previous => [...previous, res.data]);
  };
  useEffect(() => {
    if (metar.length !== 0) {
      submitHandler();
    }
  });

  console.log(metar);

  const deleteAirport = id => {
    setMetar(previous => previous.filter(airport => airport.station !== id));
  };

  return (
    <Container>
      <GlobalStyle img={Sky} />
      <Header />
      <Title>Aviation Weather</Title>
      <SearchBar submitHandler={submitHandler} />
      <GridContainer metar={metar} deleteAirport={deleteAirport} />
    </Container>
  );
};

export default App;
