import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import GridContainer from "./GridContainer";
import styled from "styled-components";
import Legend from "./Legend";
import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN;

const Custom = () => {
  const [ident, setIdent] = useState("");
  const [aerodrome, setAerodrome] = useState([]);
  const [metar, setMetar] = useState([]);
  const [taf, setTaf] = useState([]);

  useEffect(() => {
    if (!ident) {
      return;
    }
    const stationURL = `https://avwx.rest/api/station/${ident}`;
    const metarURL = `https://avwx.rest/api/metar/${ident}`;
    const tafURL = `https://avwx.rest/api/taf/${ident}`;

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
  }, [ident]);

  return (
    <Container>
      <Title>Custom Search</Title>
      <Legend />
      <SearchBar
        setIdent={setIdent}
        aerodrome={aerodrome}
        metar={metar}
        taf={taf}
        setAerodrome={setAerodrome}
        setMetar={setMetar}
        setTaf={setTaf}
      />
      <GridContainer
        ident={ident}
        aerodrome={aerodrome}
        metar={metar}
        taf={taf}
        setAerodrome={setAerodrome}
        setMetar={setMetar}
        setTaf={setTaf}
      />
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
