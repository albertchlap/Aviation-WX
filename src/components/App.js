import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Header from "./Header";

import GlobalStyle from "./GlobalStyles";
import Nearest from "./Nearest";
import Custom from "./Custom";
import axios from "axios";
import Sky from "../images/sky.jpg";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
let latitude;
let longitude;

const App = () => {
  const [aerodrome, setAerodrome] = useState([]);
  const [metar, setMetar] = useState([]);
  const [taf, setTaf] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const submitHandler = query => {
    const stationURL = `https://avwx.rest/api/station/${query}`;
    const metarURL = `https://avwx.rest/api/metar/${query}`;
    const tafURL = `https://avwx.rest/api/taf/${query}`;

    const getAirport = axios.get(stationURL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    const getMetar = axios.get(metarURL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    const getTaf = axios.get(tafURL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    axios.all([getAirport, getMetar, getTaf]).then(
      axios.spread((...allData) => {
        console.log(allData[0]);
        console.log(allData[1]);
        console.log(allData[2]);
      })
    );

    // setAerodrome(previous => [...previous, stationRes.data]);
    // setMetar(previous => [...previous, metarRes.data]);
    // setTaf(previous => [...previous, tafRes.data]);
  };

  if (aerodrome.length !== 0) {
    submitHandler();
  }

  console.log(aerodrome);
  console.log(metar);
  console.log(taf);
  console.log("render");

  const deleteAirport = id => {
    setAerodrome(previous => previous.filter(airport => airport.icao !== id));
  };

  return (
    <Router>
      <Container>
        <Route path='/' exact component={Nearest} />
        <Route
          path='/custom'
          exact
          render={() => (
            <Custom
              aerodrome={aerodrome}
              deleteAirport={deleteAirport}
              submitHandler={submitHandler}
            />
          )}
        />
        <GlobalStyle img={Sky} />
        <Header />
        {/* <Title>Aviation Weather</Title> */}
        {/* <SearchBar submitHandler={submitHandler} /> */}
      </Container>
    </Router>
  );
};

export default App;
