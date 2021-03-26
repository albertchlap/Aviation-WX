import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import GridContainer from "./GridContainer";
import GlobalStyle from "./GlobalStyles";
import axios from "axios";
import Sky from "../images/sky.jpg";

const Title = styled.h1`
  text-align: center;
  position: relative;
  right: 30px;
  color: #333;
  letter-spacing: 2px;
  margin: 50px;
`;

const TOKEN = "nomE7jTacon8Qt_eboDH4LrKn1OQU0-nuByXV9eb6MQ";

const App = () => {
  const [metar, setMetar] = useState([]);

  useEffect(() => submitHandler());

  const submitHandler = async query => {
    const res = await axios.get(`https://avwx.rest/api/metar/${query}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    setMetar(previous => [...previous, res.data]);
  };
  console.log(metar);

  const deleteAirport = id => {
    setMetar(previous => previous.filter(airport => airport.station !== id));
  };

  return (
    <>
      <GlobalStyle img={Sky} />
      <Title>Aviation Weather</Title>
      <SearchBar submitHandler={submitHandler} />
      <GridContainer metar={metar} deleteAirport={deleteAirport} />
    </>
  );
};

export default App;
