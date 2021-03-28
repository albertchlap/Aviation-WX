import React, { useState, useEffect } from "react";

import styled from "styled-components";
import GridContainer from "./GridContainer";
import axios from "axios";

const TOKEN = "nomE7jTacon8Qt_eboDH4LrKn1OQU0-nuByXV9eb6MQ";

const Container = styled.div``;

const Title = styled.h1`
  color: #fff;
  opacity: 0.7;
  margin-top: 100px;
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
        setNearest(previous => [...previous, res.data]);
      };
      getNearest();
    });
  }, []);

  console.log(nearest);

  return (
    <Container>
      <Title>Nearest Airports</Title>
      <GridContainer nearest={nearest} />
    </Container>
  );
};

export default Nearest;
