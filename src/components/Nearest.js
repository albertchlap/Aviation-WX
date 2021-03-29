import React, { useState, useEffect } from "react";

import styled from "styled-components";
import GridContainer from "./GridContainer";
import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN;

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

const Nearest = () => {
  const [nearest, setNearest] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude.toFixed(1);
      const longitude = position.coords.longitude.toFixed(1);
      const coord = `${latitude},${longitude}`;
      const getNearest = async () => {
        const res = await axios.get(
          `https://avwx.rest/api/station/near/${coord}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
        setNearest(res.data);
      };
      getNearest();
    });
  }, []);

  const deleteNearest = id => {
    setNearest(previous => previous.filter(ident => ident.station.icao !== id));
  };

  return (
    <Container>
      <Title>Nearest Airports</Title>
      <GridContainer nearest={nearest} deleteNearest={deleteNearest} />
    </Container>
  );
};

export default Nearest;
