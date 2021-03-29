import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import GridContainer from "./GridContainer";
import styled from "styled-components";
import axios from "axios";

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

const TOKEN = process.env.REACT_APP_TOKEN;

const Custom = () => {
  const [aerodrome, setAerodrome] = useState([]);
  const [metar, setMetar] = useState([]);
  const [taf, setTaf] = useState([]);

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
        setAerodrome(previous => [...previous, allData[0].data]);
        setMetar(previous => [...previous, allData[1].data]);
        setTaf(previous => [...previous, allData[2].data]);
      })
    );
  };

  useEffect(() => {
    if (aerodrome.length !== 0 && metar.length !== 0 && taf.length !== 0) {
      submitHandler();
    }
  }, [aerodrome.length, taf.length, metar.length]);

  const deleteAirport = id => {
    setAerodrome(previous => previous.filter(airport => airport.icao !== id));
    setMetar(previous => previous.filter(wx => wx.station !== id));
    setTaf(previous => previous.filter(forecast => forecast.station !== id));
  };

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
